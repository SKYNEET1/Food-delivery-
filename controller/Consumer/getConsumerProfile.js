const Consumer = require('../../model/Consumer')

exports.getConsumerProfile = async (req, res) => {

    try {
    const { phoneNo } = req.user;

        const isProfile = await Consumer.findOne({ phoneNo })
        if (!isProfile) {
            return res.status(404).json({
                success: false,
                message: `This ${phoneNo} don't have its consumer profile`
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Profile fetched successfully',
            data: isProfile
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Server error while fetching consumer profile",
            error: error.message
        });
    }
}
