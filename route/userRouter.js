const express = require('express');
const { userRegistration } = require('../controller/userRegistration');
const validateRegistration = require('../middleware/registrationBodyValidate');
const validateLoginBody = require('../middleware/loginBodyValidate');
const { userLogin } = require('../controller/userLogin');
const { getAllUsers } = require('../controller/getAllUser');
const { authenticateUser } = require('../middleware/autherisedUser');
const adminTokenValidate = require('../middleware/AdminM/adminTokenValidate');
const { refreshToken } = require('../controller/refreshToken');
const { userLogout } = require('../controller/userLogout');
const userRouter = express.Router()

userRouter.post('/refresh',refreshToken)

userRouter.post('/auth/register', validateRegistration, userRegistration)
userRouter.post('/auth/login', validateLoginBody, userLogin)
userRouter.get('/getallusers', authenticateUser, adminTokenValidate, getAllUsers)
userRouter.post('/auth/logout', authenticateUser, userLogout)


module.exports = userRouter