const User = require('../model/User');
const { comparePassword } = require('../utils/hash');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt')

exports.userLogin = async (req, res) => {
    try {
        const { phoneNo, password, email } = req.body;

        const user = await User.findOne({ $or: [{ phoneNo }, { email }] })
        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'User is not registered'
            });
        }

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const accessToken = generateAccessToken(user.phoneNo, user.category, user._id);
        const refreshToken = generateRefreshToken(user.phoneNo, user._id);
        user.refreshToken = refreshToken;
        await user.save()

        if (!accessToken) {
            return res.status(400).json({
                success: false,
                message: 'accessToken could not be generated'
            })
        }
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'refreshtoken could not be generated'
            })
        }
        await res.cookie('token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 2 * 60 * 60 * 1000
        })
        await res.cookie("refresh", refreshToken, {
            httpOnly: true,   // Cookie cannot be accessed by JavaScript, only sent via HTTP
            secure: true,     // Cookie will only be sent over HTTPS (not HTTP)
            sameSite: "Strict", // Cookie will only be sent from requests coming from the same site (protects against CSRF)
            maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie will expire in 7 days
        });

        return res.status(200).json({
            success: true,
            message: `${user.category} login successful`,
            accessToken,
            refreshToken: refreshToken
        });


    } catch (error) {
        return res.status(500).json({
            message: "Error logging in",
            error: error.message
        })
    }

}
