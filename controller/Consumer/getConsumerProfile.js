const Consumer = require('../../model/Consumer');
const client = require('../../utils/redis');

exports.getConsumerProfile = async (req, res) => {

    try {
        const { phoneNo } = req.user;

        const cacheData = await client.hget('consumer', phoneNo)
        if (cacheData) {
            const parsed = JSON.parse(cacheData);

            if (!parsed.isDeleted) {
                console.log("✅ Data returned from Redis Cache");
                return res.status(200).json({
                    success: true,
                    data: parsed,
                    message: `User ${phoneNo}'s profile fetched from cache`,
                });
            }
        }

        const isProfile = await Consumer.findOne({ phoneNo }).lean();
        if (!isProfile) {
            return res.status(404).json({
                success: false,
                message: `This ${phoneNo} don't have its consumer profile`
            })
        }

        if (isProfile.isDeleted === true) {
            return res.status(400).json({
                success: false,
                message: 'This User profile has deleted'
            })
        }

        await client.hset('consumer', phoneNo, JSON.stringify(isProfile));
        console.log('data fetched from mongodb and stored in redis');
        await client.expire('consumer',120)


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
