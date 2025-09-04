const Joi = require("joi");

const adminProfileValidator = async (req, res, next) => {

    const { phoneNo } = req.user;

    const consumerProfileValidating = Joi.object({
        age: Joi.number().integer().strict().messages({
            "number.base": "Age should be a number",
            "number.integer": "Age must be an integer"
        }),
        gender: Joi.string().trim().valid('male', 'female').messages({
            "any.only": "Gender must be either male or female",
            "string.empty": "Gender cannot be empty"
        }),
        empId: Joi.string().trim().messages({
            "string.empty": "empId can not be empty"
        })
    })                      

    const validateProfile = (bodyData) => {
        return consumerProfileValidating.validate(bodyData, { abortEarly: false, allowUnknown: true })
    }
    const { error, value } = validateProfile(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((d, index) => `${index} --> ${d.message}`).join(', ')
        })
    }

    req.body = { value, phoneNo };
    next();

}

module.exports = adminProfileValidator