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
    async getById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id']
            });
            console.log(user);
            return user;

        } catch (error) {
            console.log("something went wrong in the repository layer");
            console.log(error);
        }
    }
    async getByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            return user;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            console.log(error);
        }
    }

}
module.exports = UserRespository;