const User = require("../model/User");
const joi = require('joi');

const validateRegistration = async (req, res, next) => {

    const validateUserSchema = joi.object({
        userName: joi.string().trim().required().messages({
            "string.empty": "User name can not be empty",
            "any.required": "User name is mandatory"
        }),
        phoneNo: joi.number().integer().strict().required().messages({
            "number.base": "phoneNo must be a number",
            "number.integer": "phoneNo must be integer, no decimal allowed",
            "any.required": "phoneNo field is mandatory"
        }),
        email: joi.string().trim().email().required().messages({
            "string.empty": "email can not be empty",
            "string.email": "email should be valid",
            "any.required": "email is mandatory"
        }),
        password: joi.string().trim().required().messages({
            "string.empty": "password can not be empty",
            "any.required": "password is mandatory"
        }),
        confirmPassword: joi.string().trim().valid(joi.ref('password')).required().messages({
            "any.only": "Confirm password must match password",
            "any.required": "Confirm password is mandatory",
            "string.empty": "Confirm password cannot be empty"
        }),
        category: joi.string().trim().lowercase().valid("restaurant", "consumer", "delivery agent").required().messages({
            'any.only': 'category must be either restaurant, consumer or delivery agent',
            'any.required': 'category is mandatory',
            'string.empty': 'category can not be empty'
        }),
    })

    const validateUser = (bodyData) => {
        return validateUserSchema.validate(bodyData, { abortEarly: false, allowUnknown: false })
    }

    const { error, value } = validateUser(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((d, index) =>  `${index} --> ${d.message}` ).join(', ')
        })
    }

    try {

        const existingUser = await User.findOne({ phoneNo: value.phoneNo });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            });
        }
        const { confirmPassword, ...sanitizeValue } = value;
        req.body = sanitizeValue;
        next();

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error in accessing Database ",
            error: error.message
        });
    }

}

module.exports = validateRegistration




