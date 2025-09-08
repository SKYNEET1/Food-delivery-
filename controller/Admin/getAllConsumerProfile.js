const Consumer = require("../../model/Consumer");

exports.getAllConsumerProfile = async (req, res) => {

    try {
        const allConsumer = await Consumer.find(
            { isDeleted: false },
            "-__v"
        );
        if (!allConsumer.length) {
            return res.status(404).json({
                success: false,
                message: "No active Consumer profiles found",
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Fetched all Consumer profile',
            data: allConsumer
        })

    } catch (error) {
        console.log('Error in getting all Consumer Profile')
        return res.status(500).json({
            success: false,
            message: "Server error while geting All Consumer profile",
            error: error.message
        });
    }
}   

// .populate('activeaddress')