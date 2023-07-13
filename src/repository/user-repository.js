const { User } = require('../models/index');
class UserRespository {

    async create(data) {
        try {
            const user = await User.create(data);
            return user;

        } catch (error) {
            console.log("something went wrong in the repository layer");
            console.log(error);
        }
    }
    async get(userId) {
        try {
            const user = await User.findByPk(userId);
            return user;

        } catch (error) {
            console.log("something went wrong in the repository layer");
            console.log(error);

        }

    }

}
module.exports = UserRespository;