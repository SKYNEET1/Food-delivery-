const express = require('express');
const { deliveryAgentProfile } = require('../controller/Delivery Agent/deliveryAgentProfile');
const { authenticateUser } = require('../middleware/autherisedUser');
const deliveryAgentTokenValidate = require('../middleware/deliveryAgentM/deliveryAgentTokenValidate');
const deliveryAgentProfileValidation = require('../middleware/deliveryAgentM/deliveryAgentProfileValidator');
const { confirmOtp } = require('../controller/Delivery Agent/confirmOtp');
const deliveryRouter = express.Router()


deliveryRouter.post('/delivery/profile/create', authenticateUser,deliveryAgentTokenValidate,deliveryAgentProfileValidation,deliveryAgentProfile)
deliveryRouter.get('/delivery/otp', authenticateUser,deliveryAgentTokenValidate,confirmOtp)


module.exports = deliveryRouter