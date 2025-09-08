const Consumer = require("../../model/Consumer");

exports.deleteConsumerProfile = async (req, res) => {
    try {

        const { phoneNo } = req.user;
        const targetedConsumerProfile = await Consumer.findOneAndUpdate(
            { phoneNo, isDeleted: false },
            { isDeleted: true },
            { new: true }
        );
        if (!targetedConsumerProfile) {
            return res.status(404).json({
                success: false,
                message: "Consumer profile not found or already deleted"
            });
        }

        return res.status(200).json({
            success: true,
            message: 'The user is successfully deleted',
            data: targetedConsumerProfile
        })

    } catch (error) {

        console.log("Error in deleting consumer profile",error)
        return res.status(500).json({
            success: false,
            message: "Server error while deleting consumer profile",
            error: error.message
        });
    }
    
}