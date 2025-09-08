const Consumer = require("../../model/Consumer");
const ConsumerAddress = require("../../model/ConsumerAddress")

exports.getAllConsumerAddress = async (req, res) => {
    try {
        const { phoneNo } = req.user
        if (!phoneNo) {
            return res.status(400).json({
                success: false,
                message: "PhoneNo is required"
            });
        }

        const user = await Consumer.findOne({ phoneNo,isDeleted:false });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `This ${phoneNo} Profile not found or deleted`
            })
        }
    
        const targetAddress = await ConsumerAddress.find({ phoneNo });
        if (targetAddress.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No addresses found for this user"
            });
        }

        return res.status(200).json({
            success: true,
            message: `Found ${targetAddress.length} addresses for this user`,
            data: targetAddress,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while fetching address",
            error: error.message
        });
    }
}