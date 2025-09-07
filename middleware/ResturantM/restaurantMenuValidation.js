const Joi = require("joi");

const restaurantMenuValidation = async (req, res, next) => {
    const { phoneNo } = req.user;

    const restaurantMenuValidateSchema = Joi.object({
        foodName: Joi.string().trim().required().messages({
            "string.empty": "Food name is required",
        }),
        description: Joi.string().trim().allow(""),
        price: Joi.number().strict().min(0).required().messages({
            "number.base": "Price must be a number",
            "number.min": "Price cannot be negative",
            "any.required": "Price is required"
        }),
        foodType: Joi.string().valid("Veg", "Non Veg").required().messages({
            "any.only": "Food type must be either Veg or Non Veg",
        }),
        isAvailable: Joi.boolean().default(true),
        quantity: Joi.number().strict().min(1).required().messages({
            "number.base": "quantity must be a number",
            "number.min": "quantity cannot be less than 1",
            "any.required": "quantity is required"
        })
    })

    const bodySchemaValidate = (bodyData) => {
        return restaurantMenuValidateSchema.validate(bodyData, { abortEarly: false, allowUnknown: true })
    }

    const { error, value } = bodySchemaValidate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((d, index) => `${index} --> ${d.message}`).join(', ')
        })
    }

    req.body = { value, phoneNo };
    next();
}

module.exports = restaurantMenuValidation