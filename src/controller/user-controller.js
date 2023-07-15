const repository = require('../repository');
const { UserService } = require('../service/index');
const AppErrors = require('../utils/error-handler');
const { ClientErrorCodes,
    ServerErrorCodes,
    SuccessCodes } = require('../utils/error-codes');
const userService = new UserService();

const CreateUser = async (req, res) => {
    try {
        const newUserData = {
            email: req.body.email,
            password: req.body.password
        }
        const userdata = await userService.CreateUser(newUserData);
        return res.status(SuccessCodes.CREATED).json({
            data: userdata,
            success: true,
            message: "user created succesfully ",
            err: {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err: error.explanation
        });
    }
}

const GetById = async (req, res) => {
    try {

        const user = await userService.GetById(req.query.id);
        console.log(user);
        return res.status(SuccessCodes.OK).json({
            data: user,
            success: true,
            message: "fetched user succesfully ",
            err: {}
        });
    } catch (error) {
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "error in fetching user ",
            err: error
        });
    }
}

const SignIn = async (req, res) => {
    try {
        const user = await userService.SignIn(req.body.email, req.body.password);
        // console.log(user);
        return res.status(SuccessCodes.OK).json({
            data: user,
            success: true,
            message: "user signed-in succesfully ",
            err: {}
        });
    } catch (error) {
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "error in signing in user ",
            err: error
        });
    }
}

const IsAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const repsonse = await userService.IsAuthenticated(token);
        return res.status(SuccessCodes.OK).json({
            data: repsonse,
            success: true,
            message: "user is authenticated succesfully ",
            err: {}
        });

    } catch (error) {
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "error in authenticating user ",
            err: error
        });
    }
}
const isAdmin = async (req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(SuccessCodes.OK).json({
            data: response,
            success: true,
            message: "admin authenticated succesfully ",
            err: {}
        });

    } catch (error) {
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: "error in validating if admin ",
            err: error
        });
    }
}

module.exports = {
    CreateUser, GetById, SignIn, IsAuthenticated, isAdmin
}