const { UserService } = require('../service/index');
const { ClientErrorCodes,
    ServerErrorCodes,
    SuccessCodes } = require('../utils/error-codes');
const userService = new UserService();
const CreateUser =async (req, res) => {
    try {
        const newUserData = {
            email: req.body.email,
            password: req.body.password
        }
        const userdata =await  userService.CreateUser(newUserData);
        return res.status(SuccessCodes.CREATED).json({
            data: userdata,
            success: true,
            message: "user created succesfully ",
            err: {}
        });
    } catch (error) {
        console.log("in the catch blog");
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: true,
            message: "user doesn't created ",
            err: error
        });
    }
}
module.exports ={
    CreateUser
}