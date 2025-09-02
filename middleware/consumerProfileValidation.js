const Joi = require("joi");

const consumerProfileValidator = async (req, res, next) => {

    const { phoneNo, category } = req.user;
    if (category !== 'consumer') {
        return res.status(400).json({
            success: false,
            message: `This ${phoneNo} is not autherised to create User profile`
        })
    }

    const addressValidating = Joi.object({
        city: Joi.string().trim().min(2).max(50).required(),
        state: Joi.string().trim().min(2).max(50).required(),
        pinCode: Joi.string().trim().min(5).required(),
        landMark: Joi.string().allow('').trim()
    })

    const consumerProfileValidating = Joi.object({
        gender: Joi.string().trim().valid('male', 'female').default('male'),
        address: Joi.array().items(addressValidating).min(1),
    })

    const validateProfile = (bodyData) => {
        return consumerProfileValidating.validate(bodyData, { abortEarly: false })
    }
    const { error, value } = validateProfile(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((d,index) => `${index} --> ${d.message}`).join(', ')
        })
    }
    req.body = value;
    next();
}

module.exports = consumerProfileValidator