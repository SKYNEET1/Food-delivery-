const User = require("../model/User");
const joi = require('joi');

const validateLoginBody = async (req, res, next) => {
    try {
        const validateLoginData = joi.object({
            email: joi.string().email().required().messages({
                "string.empty": "email can not be empty",
                "string.email": "email should be valid",
                "any.required": "email is mandatory"
            }),
            password: joi.string().required().messages({
                "string.empty": "password can not be empty",
                "any.required": "password is mandatory"
            }),
            phoneNo: joi.string().required().messages({
            "string.base": "Phone number must be string",
            "any.required": "Phone number is required"
            })
        })

        const validateLogin = (bodyData) => {
            return validateLoginData.validate(bodyData, { abortEarly: false, allowUnknown: false })
        }

        const { error, value } = validateLogin(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details.map((d, index) =>  `${index} --> ${d.message}` ).join(', ')
            })
        }

        try {
            const isUserSignedUp = await User.findOne({ phoneNo: value.phoneNo, email: value.email })
            if (!isUserSignedUp) {
                return res.status(400).json({
                    status: false,
                    message: 'User is not registered'
                });
            }

            req.body = { value, isUserSignedUp };
            next();
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Error in accessing Database ",
                error: error.message
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in validating ",
            error: error.message
        })
    }
}

module.exports = validateLoginBody