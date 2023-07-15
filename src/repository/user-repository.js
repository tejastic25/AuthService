const { User } = require('../models/index');
const ValidationError = require('../utils/validation-error');
class UserRespository {

    async create(data) {
        try {
            const user = await User.create(data);

            return user;

        } catch (error) {
            if (error.name == "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            console.log("something went wrong in the repository layer");
            // console.log(error);
            throw error;
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
            throw error;
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
            throw error;
        }
    }

}
module.exports = UserRespository;