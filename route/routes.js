const express = require('express');
const { userRegistration } = require('../controller/userRegistration');
const validateRegistrationMiddleware = require('../middleware/registrationBodyValidate');
const validateLoginBody = require('../middleware/loginBodyValidate');
const { userLogin } = require('../controller/userLogin');
const router = express.Router()

router.post('/register',validateRegistrationMiddleware,userRegistration)
router.post('/login',validateLoginBody,userLogin)

module.exports = router