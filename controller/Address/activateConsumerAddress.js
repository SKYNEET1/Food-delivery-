const Consumer = require("../../model/Consumer")
const ConsumerAddress = require("../../model/ConsumerAddress")

exports.activateConsumerAddress = async (req, res) => {
    try {
        const { phoneNo } = req.user
        const { _id } = req.params
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Address _id is required"
            });
        }

        const user = await Consumer.findOne({ phoneNo });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Consumer with this phoneNo is not found"
            });
        }
        if (user.isDeleted === true) {
            return res.status(400).json({
                success: false,
                message: 'This User profile has deleted'
            })
        }

        const targetAddress = await ConsumerAddress.findOne({ _id, phoneNo });
        if (!targetAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found for this user"
            });
        }

        if (targetAddress.active === true) {
            return res.status(400).json({
                success: false,
                message: `Address ${_id} is already in use`,
                data: targetAddress
            })
        }

        await ConsumerAddress.updateMany(
            { phoneNo },
            { $set: { active: false } }
        )

        targetAddress.active = true;
        await targetAddress.save();

        await Consumer.updateOne(
            { phoneNo },
            {
                $set: {
                    activeAddress: targetAddress._id
                }
            }
        )

        return res.status(200).json({
            success: true,
            message: `Address ${_id} has been set as active`,
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