const User = require("../model/User");

exports.userLogout = async (req, res) => {

    try {
        const { phoneNo, _id } = req.user;
        if (!phoneNo || !_id) {
            return res.status(400).json({
                message: "Invalid user data"
            });
        }

        const user = await User.findOneAndUpdate(
            { _id, phoneNo },
            {
                $set: { refreshToken: undefined }
            },
            { new: true }
        )
        if(!user){
            return res.status(400).json({
                message:  `User ${user.userName} with ${user.phoneNo} is not registered`
            })
        }

        return res.status(200)
            .clearCookie('token', { httpOnly: true, secure: true, sameSite: "Strict" })
            .clearCookie('refresh', { httpOnly: true, secure: true, sameSite: "Strict" })
            .json({
                message: `User ${user.userName} with ${user.phoneNo} is logged out successfully`,
                data: user
            })       
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error logging out",
            error: error.message
        });
    }
}