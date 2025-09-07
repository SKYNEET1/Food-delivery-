const Consumer = require("../../model/Consumer");
const User = require("../../model/User");

exports.updateConsumerProfile = async (req, res) => {

    try {
        const { phoneNo } = req.user;
        if (!phoneNo) {
            return res.status(400).json({
                success: false,
                message: 'no phoneNO is present in token after validation'
            })
        }


        const isProfile = await Consumer.findOne({ phoneNo })
        if (!isProfile) {
            return res.status(400).json({
                success: false,
                message: `This ${phoneNo} did't have profile`
            })
        }

        const changesAllowed = ['name', 'gender', 'age', 'foodType'];
        const update = {};
        Object.keys(req.body).every((key) => {
            if (changesAllowed.includes(key)) {
                update[key] = req.body[key];
            }
        })
        if (Object.keys(update).length === 0) {
            return res.status(400).json({
                success: false,
                message: `No valid fields provided. Allowed fields: ${allowedFields.join(", ")}`
            });
        }

        if (update.name) {
            const user = await User.findOne({ phoneNo });
            if (user) {
                user.userName = name;
                await user.save()
            }
        }

        const updatedConsumer = await Consumer.findOneAndUpdate(
            { phoneNo },
            { ...update },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: `${isProfile.name} has updated the profile successfully`,
            data: updatedConsumer
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while updating profile",
            error: error.message
        });
    }

}