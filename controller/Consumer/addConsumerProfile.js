const User = require('../../model/User')
const Consumer = require('../../model/Consumer')

exports.addConsumerProfile = async (req, res) => {

    const { value, phoneNo } = req.body;
    const isUser = await User.findOne({ phoneNo })
    if (!isUser) {
        return res.status(400).json({
            success: false,
            message: `This ${phoneNo} is not yet registered`
        })
    }

    const isProfile = await Consumer.findOne({ phoneNo })
    if (isProfile) {
        return res.status(400).json({
            success: false,
            message: `This ${phoneNo} already has Profile added`
        })
    }

    const response = await Consumer.create({
        ...value,
        name: isUser.userName,
        phoneNo,
        email: isUser.email,
        category: isUser.category,
        activeAddress: null,
        addresses:[],
        orders: []
    })

    if (!response) {
        return res.status(400).json({
            success: true,
            message: "Could not create a new consumer profile in the DB"
        })
    }

    return res.status(201).json({
        success: true,
        message: 'Profile updated successfull',
        data: response
    })
}
