const Joi = require('joi')

const orderValidation = async (req, res, next) => {

    const { _id } = req.user;

    const orderParamsValidateObj = Joi.object({
        restaurant_id: Joi.string().length(24).hex().required().messages({
            "string.empty": "restaurant_id can not be empty",
            "string.base": "restaurant_id can only be string",
            "string.length": "restaurant_id must be 24 characters long",
            "string.hex": "restaurant_id must be a valid hex string"
        }),
        menu_id: Joi.string().length(24).hex().required().messages({
            "string.empty": "menu_id can not be empty",
            "string.base": "menu_id can only be string",
            "string.length": "menu_id must be 24 characters long",
            "string.hex": "menu_id must be a valid hex string"
        })
    })
    const validateOrder = (paramsData) => {
        return orderParamsValidateObj.validate(paramsData, { abortEarly: false, allowUnknown: false })
    }

    const { error, value } = validateOrder(req.params);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((d, index) => `${index} --> ${d.message}`).join(', ')
        })
    }

    const orderBodyValidateObj = Joi.object({
        foodStatus: Joi.string().trim().messages({
            "string.base": "foodStatus must be a string",
            "string.empty": "foodStatus cannot be empty",
        }),
        paymentStatus: Joi.string().trim().messages({
            "string.base": "paymentStatus must be a string",
            "string.empty": "paymentStatus cannot be empty",
        }),
        items: Joi.array().items(Joi.object({
            foodItem: Joi.string().trim().messages({
                "string.base": "foodItem must be a string",
                "string.empty": "foodItem cannot be empty",
                "string.hex": "foodItem must be a valid ObjectId",
                "any.required": "foodItem is required"
            }),
            quantity: Joi.number().integer().strict().min(1).required().messages({
                "number.base": "quantity must be a number",
                "number.min": "quantity must be at least 1",
                "any.required": "quantity is required"
            })
        })).messages({
            "array.base": "items must be an array",
            "array.min": "items must have at least 1 element",
            "any.required": "items are required"
        })

    })

const validateOrderBody = (bodyData) => {
    return orderBodyValidateObj.validate(bodyData, { abortEarly: false, allowUnknown: false })
}
const validateBodySchema = validateOrderBody(req.body)
if (validateBodySchema.error) {
    return res.status(400).json({
        success: false,
        message: validateBodySchema.error.details
            .map((d, index) => `${index} --> ${d.message}`)
            .join(", ")
    });
}



req.validateData = {
    params: value,
    body: validateBodySchema.value,
    _id
};

next();

}

module.exports = orderValidation