const Joi = require("joi");
const DeliveryProfile = require("../../model/DeliveryProfile");
const deliveryAgentProfileValidation = async (req, res, next) => {
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

module.exports = deliveryAgentProfileValidation