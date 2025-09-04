const jwt = require('jsonwebtoken');
const User = require("../model/User");
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

exports.refreshToken = async (req, res) => {
    try {
        const  refreshToken  = req.cookies?.refresh;
        console.log(refreshToken)
        if (!refreshToken) {
            return res.status(401).json({
                message: "No refresh token"
            });
        }

        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(400).json({
                message: "Invalid refresh token or user is not logged in"
            });
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY)

        const newAccessToken = generateAccessToken(user.phoneNo, user.category, user._id);
        const newRefreshToken = generateRefreshToken(user.phoneNo, user._id);
        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie("token", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 2 * 60 * 60 * 1000
        });

        res.cookie('refresh', newRefreshToken, {
            httpOnly:true,
            secure:true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully", 
        });
    } catch (error) {
        return res.status(400).json({
            message: "Refresh token expired or invalid",
            error: error.message
        });
    }
}