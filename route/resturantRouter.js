const express = require('express');
const { authenticateUser } = require('../middleware/autherisedUser');
const restaurantTokenValidate = require('../middleware/ResturantM/resturantTokenValidate');
const restaurantProfileValidation = require('../middleware/ResturantM/restaurantProfileValidation');
const { createRestaurantProfile } = require('../controller/Resturant/createResturantProfile');
const restaurantMenuValidation = require('../middleware/ResturantM/restaurantMenuValidation');
const { createMenuForRestaurant } = require('../controller/Resturant/createMenuForResturant');
const { deleteRestaurantProfile } = require('../controller/Resturant/deleteRestaurantProfile');
const resturantRouter = express.Router()

resturantRouter.post('/resturant/profile', authenticateUser,restaurantTokenValidate,restaurantProfileValidation,createRestaurantProfile)
resturantRouter.post('/resturant/menu', authenticateUser,restaurantTokenValidate,restaurantMenuValidation,createMenuForRestaurant)
resturantRouter.post('/resturant/profile/delete', authenticateUser,restaurantTokenValidate,deleteRestaurantProfile)


module.exports = resturantRouter