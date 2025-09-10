const jwt = require('jsonwebtoken');
const User = require("../model/User");
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refresh;
        if (!refreshToken) {
            return res.status(401).json({
                message: "No refresh token provided"
            });
        }

        let payload;
        try {
            payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
        } catch (error) {
            return res.status(401).json({
                message: "Invalid or expired refresh token"
            });
        }
        const { phoneNo } = payload

        if (!phoneNo) {
            return res.status(401).json({
                message: "phoneNo is absent in refresh token"
            });
        }

        const user = await User.findOne({ phoneNo });
        if (!user) {
            return res.status(400).json({
                message: "Invalid refresh token or user is not logged in"
            });
        }

        if (user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Refresh token does not match DB record" });
        }


        const newAccessToken = generateAccessToken(user.phoneNo, user.category, user._id);
        const newRefreshToken = generateRefreshToken(user.phoneNo, user._id);

        if (!newAccessToken || !newRefreshToken) {
            return res.status(400).json({
                message: "Not able to regenerate the newAccessToken or newRefreshToken"
            });
        }
        
        try {
            user.refreshToken = newRefreshToken;
            await user.save();

            res.cookie("token", newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 2 * 60 * 60 * 1000
            });

            res.cookie('refresh', newRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

        } catch (error) {
            return res.status(500).json({
                message: "Server error in saveing new refresh token in DB"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Token refreshed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}
