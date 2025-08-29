const User = require("../model/User");
const { validateLogin } = require("../validator/SchemaValidateion");

const validateLoginBody = async (req, res, next) => {
    try {
    const { id, email, password } = req.body;
        if (!id || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please give all field'
            })
        }

        const { error, value } = validateLogin(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details.map(d => d.message).join(',')
            })
        }

        try {
            const isUserSignedUp = await User.findOne({ id: value.id, email:value.email })
            if (!isUserSignedUp) {
                return res.status(400).json({
                    status: false,
                    message: 'User is not registered'
                });
            }

            req.body = {value,isUserSignedUp};
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