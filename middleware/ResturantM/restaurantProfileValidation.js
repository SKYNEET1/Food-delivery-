const Joi = require('joi');

const restaurantProfileValidation = async (req, res, next) => {
    const { phoneNo } = req.user;

    const restaurantProfileValidateSchema = Joi.object({
        nameOfResturant: Joi.string().trim().min(3).max(100).required().messages({
            "string.base": "Restaurant name must be a string",
            "string.empty": "Restaurant name cannot be empty",
            "string.min": "Restaurant name must be at least 3 characters long",
            "string.max": "Restaurant name must not exceed 100 characters",
            "any.required": "Restaurant name is required"
        }),

        address: Joi.string().trim().min(5).max(200).required().messages({
            "string.base": "Address must be a string",
            "string.empty": "Address cannot be empty",
            "string.min": "Address must be at least 5 characters long",
            "string.max": "Address must not exceed 200 characters",
            "any.required": "Address is required"
        }),

    })

    const validateResturantBody = (bodyData) => {
        return restaurantProfileValidateSchema.validate(bodyData, { abortEarly: false, allowUnknown: true })
    }

    const { error, value } = validateResturantBody(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((d, index) => `${index} --> ${d.message}`).join(', ')
        })
    }

    req.body = { value, phoneNo };
    next();

}

module.exports = restaurantProfileValidation
