const express = require('express');
const { addAdminProfile } = require('../controller/Admin/adminProfile');
const { authenticateUser } = require('../middleware/autherisedUser');
const adminTokenValidate = require('../middleware/AdminM/adminTokenValidate');
const adminProfileValidator = require('../middleware/AdminM/adminProfileValidator');
const { getAllRestaurantProfile } = require('../controller/Admin/getAllRestaurantProfile');

const adminRouter = express.Router()

adminRouter.post('/admin/addprofile', authenticateUser, adminTokenValidate, adminProfileValidator, addAdminProfile)
adminRouter.post('/admin/getAllRestaurant', authenticateUser, adminTokenValidate, getAllRestaurantProfile)

module.exports = adminRouter