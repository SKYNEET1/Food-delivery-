const Consumer = require('../../model/Consumer');
const User = require('../../model/User');

exports.addConsumerProfile = async (req, res) => {

    try {
        const { value, phoneNo } = req.body;
        if (!phoneNo || !value) {
            return res.status(400).json({
                success: false,
                message: 'no phoneNO and value is present in req.body after validation'
            })
        }

        const isUser = await User.findOne({phoneNo});
        if(!isUser){
            return res.status(400).json({
                success: false,
                message: 'isUser could not be fetched from this phoneNo'
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
            activeAddress: [],
            isDeleted:false,
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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while creating consumer profile",
            error: error.message
        });
    }
}
