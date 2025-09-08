const DeliveryProfile = require("../../model/DeliveryProfile")
const Order = require("../../model/Orders")
const User = require("../../model/User")

exports.deliveryAgentProfile = async (req, res) => {
    try {
        const { vehicleDetails, licenseNo, address, availability } = req.body.value
        const { phoneNo } = req.body

        const order = Order.findOne({phoneNo})
        const deliveries = order ? order._id : [];
        const user = await User.findOne({ phoneNo })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User with phone number ${phoneNo} does not exist`
            });
        }

        const response = await DeliveryProfile.create({
            address,
            availability,
            agentName: user.userName,
            phoneNo,
            deliveries,
            user: user._id
        })
        if(!response){
            return res.status(400).json({
                success:false,
                message: "Could not create a new document in the DB"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Delivery agent profile created successfully",
            data: response
        });

    } catch (error) {
        console.error("Error creating delivery agent profile:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}
