const User = require('../../model/User')
const Admin = require('../../model/Admin');
const Consumer = require('../../model/Consumer');

exports.addAdminProfile = async (req, res) => {

    try {
        const { value, phoneNo } = req.body;
        const isUser = await User.findOne({ phoneNo })
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: `This ${phoneNo} is not yet registered`
            })
        }

        const isAdmin = await Admin.findOne({ phoneNo })
        if (isAdmin) {
            return res.status(400).json({
                success: false,
                message: `This ${phoneNo} already has Profile added`
            })
        }

        const response = await Admin.create({
            ...value,
            name: isUser.userName,
            phoneNo :isUser.phoneNo,
            email: isUser.email,
            blockedConsumer:[],
            blockedResturant:[],
            blockedDeliveryAgent:[]
        })

        if (!response) {
            return res.status(400).json({
                success: true,
                message: "Could not create a new Admin profile in the DB"
            })
        }

        return res.status(201).json({
            success: true,
            message: 'Profile updated successfull',
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while creating Admin profile",
            error: error.message
        });
    }
}
