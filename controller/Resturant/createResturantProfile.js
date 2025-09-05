const Resturant = require('../../model/Resturant');
const User = require('../../model/User');

exports.createRestaurantProfile = async (req, res) => {

    try {
        const { phoneNo, value } = req.body;

        const user = await User.findOne({ phoneNo });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User is not registered yet'
            })
        }

        const isRestaurant = await Resturant.findOne({ phoneNo })
        if (isRestaurant) {
            return res.status(400).json({
                success: false,
                message: `${isRestaurant.owner} already has its profile`
            })
        }

        const restaurant = await Resturant.create({
            ...value,
            owner: user.userName,
            phoneNo: user.phoneNo,
            rating: 0,
            menu: []
        })

        return res.status(201).json({
            success: true,
            message: "Restaurant profile created successfully",
            data: restaurant
        });
    } catch (error) {
        console.error("Error creating restaurant:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error:error.message
        });
    }
}
