const User = require("../model/User");
const {validateUser} = require("../validator/SchemaValidateion")

const validateRegistrationMiddleware = async (req, res, next) => {

    const { userName, id, password, email, category } = req.body;
    if (!userName || !id || !password || !email || !category) {
        return res.status(400).json({
            success: false,
            message: 'Please give all field'
        })
    }

    const { error, value } = validateUser(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(d => d.message).join(',')
        })
    }

    try {

        const existingUser = await User.findOne({ id });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            });
        }
        req.body = value;
        next();

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error in accessing Database ",
            error: err.message
        });
    }

}

module.exports = validateRegistrationMiddleware