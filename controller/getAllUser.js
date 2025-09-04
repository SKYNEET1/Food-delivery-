const User = require("../model/User");

exports.getAllUsers = async (req, res) => {

    try {
        const isUser = await User.find({}).select('-password -refreshToken')
        if (isUser.length === 0) {
            return res.status(400).json({
                success: false,
                message: `Users could not be found from DB`
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfull',
            data: isUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while fetching consumer profile",
            error: error.message
        });
    }
}
