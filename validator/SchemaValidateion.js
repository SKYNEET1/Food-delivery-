const joi = require('joi');

const validateUserSchema = joi.object({
    userName: joi.string().required(),
    id: joi.number().strict().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    category: joi.string().lowercase().valid("restaurant", "consumer").required(),
})

const validateUser = (bodyData) => {
    return validateUserSchema.validate(bodyData, { abortEarly: false, allowUnknown: false })
}

const validateLoginData = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    id: joi.number().strict().required()
})

const validateLogin = (bodyData) => {
    return validateLoginData.validate(bodyData, { abortEarly: false, allowUnknown: false })
}

module.exports = { validateUser, validateLogin }