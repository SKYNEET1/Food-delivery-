const User = require('../model/User');
const { comparePassword } = require('../utils/hash');
const generateToken = require('../utils/jwt');

exports.userLogin = async (req, res) => {
    const { phoneNo, password } = req.body.value;

    const user = req.body.isUserSignedUp
    const validPassword = comparePassword(password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }
    const token = generateToken(phoneNo, user.category);
    if (!token) {
        return res.status(400).json({
            success: false,
            message: 'token could not be generated'
        })
    }
    // await res.cookie('token', token, { httpOnly: true })

    if (user.category === 'consumer') {
        return res.status(200).json({
            success: true,
            message: 'consumer login successful', 
            token
        });
    }
    if (user.category === 'restaruant') {
        return res.status(200).json({
            success: true,
            message: 'restaurant login successful', 
            token
        });
    }
    if (user.category === 'delivery agent') {
        return res.status(200).json({
            success: true,
            message: 'delivery agent login successful', 
            token
        });
    }

}
