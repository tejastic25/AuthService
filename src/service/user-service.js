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

  


}
module.exports = UserService;