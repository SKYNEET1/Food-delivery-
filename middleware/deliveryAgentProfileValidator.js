const Joi = require("joi");
const DeliveryProfile = require("../model/DeliveryProfile");
const validateDeliveryAgent = async (req, res, next) => {
    if (!req.user || !req.user.phoneNo || !req.user.category) {
        return res.status(400).json({
            success: false,
            message: "Invalid or missing authentication details in token"
        });
    }
    const { phoneNo, category } = req.user;
    if (category !== 'delivery agent') {
        return res.status(403).json({
            success: false,
            message: `This ${phoneNo} is not autherised to create Delivery agent profile`
        })
    }

    const deliveryAgentProfileValidation = Joi.object({

        vehicleDetails: Joi.string().trim().min(2).max(100).required().messages({
            "string.base": "Vehicle details must be a text value",
            "string.empty": "Vehicle details are required",
            "string.min": "Vehicle details must be at least 2 characters",
            "string.max": "Vehicle details cannot be longer than 100 characters",
            "any.required": "Vehicle details are required"
        }),
        licenseNo: Joi.string().trim().min(5).max(20).required().messages({
            "string.base": "License number must be a text value",
            "string.empty": "License number is required",
            "string.min": "License number must be at least 5 characters",
            "string.max": "License number cannot be longer than 20 characters",
            "any.required": "License number is required"
        }),
        address: Joi.string().required().messages({
            "string.base": "address number must be a text value",
            "string.empty": "address can not be empty",
            "any.required": "Address is required"
        }),
        availability: Joi.boolean().default(true).messages({
            "boolean.base": "Availability must be true or false"
        }),

    });

    const validateSchema = (bodyData) => {
        return deliveryAgentProfileValidation.validate(bodyData, { abortEarly: false })
    }

    try {
        const isAgent = await DeliveryProfile.findOne({ phoneNo })
        if (isAgent) {
            return res.status(400).json({
                success: false,
                message: `This ${phoneNo} already has a Delivery profile`
            })
        }

        const { error, value } = validateSchema(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details.map((d, index) => `${index} --> ${d.message}`).join(', ')
            })
        }
        req.body = { value, phoneNo };
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error
        })
    }

}

module.exports = validateDeliveryAgent