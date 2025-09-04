const Consumer = require("../../model/Consumer")
const ConsumerAddress = require("../../model/ConsumerAddress")

exports.deleteConsumerAddress = async (req, res) => {
    try {
        const { phoneNo } = req.user
        const { _id } = req.params
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Address _id is required"
            });
        }
        const targetAddress = await ConsumerAddress.findByIdAndDelete(_id, phoneNo);
        if (!targetAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found for this user"
            });
        }

        if (targetAddress.active === true) {
            await Consumer.updateOne(
                { phoneNo },
                {
                    $set: {
                        activeAddress: []
                    }
                }
            )
        }

        return res.status(200).json({
            success: true,
            message: `Address ${_id} is deleted`,
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