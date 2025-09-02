const ConsumerAddress = require("../../model/ConsumerAddress")
const User = require("../../model/User")

exports.addConsumerAddress = async (req, res) => {
    try {
        const { value, phoneNo } = req.body
        if (!value || !phoneNo) {
            return res.status(400).json({
                success: false,
                message: 'value and phoneNo could not found in req.body'
            })
        }
        const isUser = await User.findOne({ phoneNo })
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: `This ${phoneNo} is not yet registered or not yet logged in`
            })
        }
        const { addressLine1, addressLine2, city, state, pinCode, landMark, type } = value
        const normalized = {
            user: isUser._id,
            addressLine1: addressLine1.trim().toLowerCase(),
            addressLine2: addressLine2 ? addressLine2.trim().toLowerCase() : '',
            city: city.trim().toLowerCase(),
            state: state.trim().toLowerCase(),
            pinCode: pinCode.trim(),
            landMark: landMark ? landMark.trim().toLowerCase() : '',
            type,
            phoneNo
        }
        const existing = await ConsumerAddress.findOne({
            user: normalized.user,
            addressLine1: normalized.addressLine1,
            addressLine2: normalized.addressLine2,
            city: normalized.city,
            state: normalized.state,
            pinCode: normalized.pinCode,
            landMark: normalized.landMark,
            type,
            phoneNo
        })

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "This address already exists for the user"
            });
        }

        const newAddress = await ConsumerAddress.create(normalized)
        if (!newAddress) {
            return res.status(400).json({
                success: false,
                message: "Address not added to DB",
            });
        }
        return res.status(201).json({
            success: true,
            message: "Address added successfully",
            data: newAddress
        });
    } catch (error) {
        console.error("Error creating address of consumer:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}