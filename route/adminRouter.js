const express = require('express');
const { addAdminProfile } = require('../controller/Admin/adminProfile');
const { authenticateUser } = require('../middleware/autherisedUser');
const adminTokenValidate = require('../middleware/AdminM/adminTokenValidate');
const adminProfileValidator = require('../middleware/AdminM/adminProfileValidator');

const adminRouter = express.Router()

adminRouter.post('/admin/addprofile', authenticateUser, adminTokenValidate, adminProfileValidator, addAdminProfile)

module.exports = adminRouter