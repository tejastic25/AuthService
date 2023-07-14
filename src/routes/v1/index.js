const express = require('express')
const router = express.Router();
const UserController = require('../../controller/user-controller');
//User signup Routes
router.post('/signUp', UserController.CreateUser);
//user signin routes
router.get('/signIn', UserController.GetById);







module.exports = router;