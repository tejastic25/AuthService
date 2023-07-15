const express = require('express')
const router = express.Router();
const UserController = require('../../controller/user-controller');
const { ValidateUserAuth } = require('../../middlewares/index');
//User signup Routes
router.post('/signUp', UserController.CreateUser);
//user signin routes
router.post('/signIn', ValidateUserAuth, UserController.SignIn);
router.get('/isAuthenticated', UserController.IsAuthenticated);

module.exports = router;