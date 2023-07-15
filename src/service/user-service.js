const { UserRepository } = require('../repository/index');
const { JWT_KEY } = require('../config/serverConfig');
const jwt = require('jsonwebtoken');
var validator = require("email-validator");
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async CreateUser(data) {
        try {
            const user = await this.repository.create(data);
            if (!this.verifyEmail(data.email)) {
                throw { error: "invalid email entered" };
            }
            return user;

        } catch (error) {
            console.log("something went wrong in service layer");
            console.log(error);
        }
    }

    async GetById(userId) {
        try {
            const user = await this.repository.getById(userId);
            return user;

        } catch (error) {
            console.log("something went wrong in service layer");
            console.log(error);
        }
    }

    async SignIn(email, plainPassword) {
        try {
            const user = await this.repository.getByEmail(email);
            if (!this.checkPassword(plainPassword, user.password)) {
                console.log("Password doesn't match");
                throw { error: "wrong password entered" }
            }
            const Jwt = this.createToken({ email: user.email, id: user.id });
            return Jwt;

        } catch (error) {
            console.log("something went wrong in service layer");
            console.log(error);
        }
    }

    createToken(user) {
        try {
            var token = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
            console.log(token);
            return token;

        } catch (error) {
            console.log("something went wrong in service layer");
            console.log(error);
        }
    }

    verifyToken(token) {
        try {
            var response = jwt.verify(token, JWT_KEY);
            return response;

        } catch (error) {
            console.log("something went wrong in service layer");
            console.log(error);
        }
    }

    verifyEmail(email) {
        try {
            const response = validator.validate(email);
            return response;

        } catch (error) {
            console.log("something went wrong in service layer");
            console.log(error);
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("something went wrong in service layer");
            console.log(error);
        }
    }

    async IsAuthenticated(token) {
        try {
            const response = await this.verifyToken(token);
            if (!response) {
                throw { error: "invalid token" };
            }
            const user = await this.repository.getById(response.id);
            if (!user) {
                console.log("no user  with corresponding token exist");
            }

            return user.id;

        } catch (error) {
            console.log("something went wrong in service layer");
            console.log(error);
        }
    }
}
module.exports = UserService;