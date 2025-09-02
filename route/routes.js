const express = require('express');
const { userRegistration } = require('../controller/userRegistration');
const validateRegistration = require('../middleware/registrationBodyValidate');
const validateLoginBody = require('../middleware/loginBodyValidate');
const { userLogin } = require('../controller/userLogin');
const { deliveryAgentProfile } = require('../controller/deliveryAgentProfile');
const { authenticateUser } = require('../middleware/autherisedUser');
const validateDeliveryAgent = require('../middleware/deliveryAgentProfileValidator');
const consumerProfileValidator = require('../middleware/ConsumerM/consumerProfileValidation');
const { addConsumerProfile } = require('../controller/Consumer/addConsumerProfile');
const consumerTokenValidate = require('../middleware/consumerTokenValidate');
const consumerAddressValidation = require('../middleware/AddressM/consumerAddressValidation');
const { addConsumerAddress } = require('../controller/Address/addConsumerAddress');
const { activateConsumerAddress } = require('../controller/Address/activateConsumerAddress');
const router = express.Router()

router.post('/auth/register',validateRegistration,userRegistration)
router.post('/auth/login',validateLoginBody,userLogin)
router.post('/consumer/profile',authenticateUser,consumerTokenValidate,consumerProfileValidator,addConsumerProfile)
router.post('/consumer/address/add',authenticateUser,consumerTokenValidate,consumerAddressValidation,addConsumerAddress)
router.post('/consumer/address/active',authenticateUser,consumerTokenValidate,activateConsumerAddress)




router.post('/deliveryProfile/create',authenticateUser,validateDeliveryAgent,deliveryAgentProfile)

module.exports = router