const express = require('express');
const { authenticateUser } = require('../middleware/autherisedUser');
const consumerProfileValidator = require('../middleware/ConsumerM/consumerProfileValidation');
const { addConsumerProfile } = require('../controller/Consumer/addConsumerProfile');
const consumerTokenValidate = require('../middleware/consumerTokenValidate');
const consumerAddressValidation = require('../middleware/AddressM/consumerAddressValidation');
const { addConsumerAddress } = require('../controller/Address/addConsumerAddress');
const { activateConsumerAddress } = require('../controller/Address/activateConsumerAddress');
const { deleteConsumerAddress } = require('../controller/Address/deleteConsumerAddress');
const { updateConsumerAddress } = require('../controller/Address/updateConsumerAddress');
const { getAllConsumerAddress } = require('../controller/Address/getAllConsumerAddress');
const { getConsumerProfile } = require('../controller/Consumer/getConsumerProfile');
const { updateConsumerProfile } = require('../controller/Consumer/updateConsumerProfile');
const consumerRouter = express.Router()

consumerRouter.post('/consumer/profile',authenticateUser,consumerTokenValidate,consumerProfileValidator,addConsumerProfile)
consumerRouter.get('/consumer/profile/get',authenticateUser,consumerTokenValidate,getConsumerProfile)
consumerRouter.patch('/consumer/profile/update',authenticateUser,consumerTokenValidate,updateConsumerProfile)

consumerRouter.post('/consumer/address/add',authenticateUser,consumerTokenValidate,consumerAddressValidation,addConsumerAddress)
consumerRouter.post('/consumer/address/:_id/active',authenticateUser,consumerTokenValidate,activateConsumerAddress)
consumerRouter.delete('/consumer/address/:_id/delete',authenticateUser,consumerTokenValidate,deleteConsumerAddress)
consumerRouter.patch('/consumer/address/:_id/update',authenticateUser,consumerTokenValidate,updateConsumerAddress)
consumerRouter.get('/consumer/address/getalladdresses',authenticateUser,consumerTokenValidate,getAllConsumerAddress)


module.exports = consumerRouter