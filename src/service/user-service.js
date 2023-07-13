const { UserRepository } = require('../repository/index');

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


}
module.exports = UserService;