const Consumer = require("../../model/Consumer")
const ConsumerAddress = require("../../model/ConsumerAddress")

exports.updateConsumerAddress = async (req, res) => {
    try {
        const { phoneNo } = req.user
        const { _id } = req.params
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Address _id is required"
            });
        }
        const targetAddress = await ConsumerAddress.findOne({ _id,phoneNo });

        if (!targetAddress) {
            return res.status(400).json({
                success: false,
                message: "Address not found for this user"
            });
        }

        const updatedData = { ...req.body };
        if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid fields provided to update",
            });
        }
        const allowedField = ['state', 'city', 'pinCode', 'type', 'addressLine1', 'addressLine2', 'landMark']
        const isValidField = Object.keys(updatedData).every(field => allowedField.includes(field))
        if (!isValidField) {
            return res.status(400).json({
                status: false,
                message: "Invalid fields to update"
            });
        }

        const updateConsumerAdd = await ConsumerAddress.updateOne(
            { _id, phoneNo },
            {
                $set: {
                    updatedData
                }
            },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: `Address ${_id} is deleted`,
            data: updateConsumerAdd,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while fetching address",
            error: error.message
        });
    }
}