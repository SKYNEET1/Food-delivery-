const express = require('express');
const { userRegistration } = require('../controller/userRegistration');
const validateRegistration = require('../middleware/registrationBodyValidate');
const validateLoginBody = require('../middleware/loginBodyValidate');
const { userLogin } = require('../controller/userLogin');
const router = express.Router()

router.post('/auth/register',validateRegistration,userRegistration)
router.post('/auth/login',validateLoginBody,userLogin)

module.exports = router