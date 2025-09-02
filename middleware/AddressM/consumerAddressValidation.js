const Joi = require("joi");

const consumerAddressValidation = async (req, res, next) => {
    const { phoneNo } = req.user

    const userAddressValidation = Joi.object({
        addressLine1: Joi.string().trim().min(3).max(100).required().messages({
            "string.empty": "Address Line 1 cannot be empty",
            "string.min": "Address Line 1 must be at least 3 characters",
            "string.max": "Address Line 1 must not exceed 100 characters",
            "any.required": "Address Line 1 is required"
        }),
        addressLine2: Joi.string().trim().allow("").max(100).messages({
            "string.max": "Address Line 2 must not exceed 100 characters"
        }),
        city: Joi.string().trim().min(2).max(50).required().messages({
            "string.empty": "City cannot be empty",
            "string.min": "City must be at least 2 characters",
            "string.max": "City must not exceed 50 characters",
            "any.required": "City is required"
        }),
        state: Joi.string().trim().min(2).max(50).required().messages({
            "string.empty": "State cannot be empty",
            "string.min": "State must be at least 2 characters",
            "string.max": "State must not exceed 50 characters",
            "any.required": "State is required"
        }),
        pinCode: Joi.string().trim().required().messages({
            "string.empty": "Pin Code cannot be empty",
            "string.base": "Pin Code must be string",
            "any.required": "Pin Code is required"
        }),
        landMark: Joi.string().trim().allow("").max(100).messages({
            "string.max": "Landmark must not exceed 100 characters",
            "string.empty": "Landmark cannot be empty",
        }),
        active: Joi.boolean().default(false).messages({
            "boolean.base": "Active must be true or false"
        }),
        type: Joi.string().valid("home", "work", "other").default("home").messages({
            "any.only": "Type must be one of [home, work, other]"
        }),
    });

    const validateAddressSchema = (bodyData) => {
        return userAddressValidation.validate(bodyData, { abortEarly: false, allowUnknown: false })
    }

    const {error, value} = validateAddressSchema(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((d, index) => `${index} --> ${d.message}`).join(', ')
        })
    }

    req.body = { value, phoneNo };
    next();

} 

module.exports = consumerAddressValidation