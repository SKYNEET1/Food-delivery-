const ConsumerAddress = require("../../model/ConsumerAddress")

exports.activateConsumerAddress = async (req, res) => {
    try {
        const { phoneNo } = req.user
        const { _id } = req.body
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Address _id is required"
            });
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

        return res.status(200).json({
            success: true,
            message: `Address ${_id} has been set as active`,
            data: targetAddress
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while activating address",
            error: error.message
        });
    }
}