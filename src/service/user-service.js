const { UserRepository } = require('../repository/index');
const { JWT_KEY } = require('../config/serverConfig');
const jwt = require('jsonwebtoken');

class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async CreateUser(data) {
        try {
            const user = await this.repository.create(data);
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

    createToken(user) {
        try {
            var token = jwt.sign(user, JWT_KEY, { expiresIn: 30 });
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
    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("something went wrong in service layer");
            console.log(error);
        }
    }
}
module.exports = UserService;