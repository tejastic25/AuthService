const express = require('express')
const router = express.Router();
const UserController = require('../../controller/user-controller');
//User signup Routes
router.post('/user', UserController.CreateUser);
router.get('/user', UserController.GetById);








module.exports = router;