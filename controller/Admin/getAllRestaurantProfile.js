const Resturant = require("../../model/Resturant")

exports.getAllRestaurantProfile = async (req, res) => {

    try {
        const allRestaurants = await Resturant.find(
            { isDeleted: false },
            "-__v"
        );
        if (!allRestaurants.length) {
            return res.status(404).json({
                success: false,
                message: "No active restaurant profiles found",
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Fetched all restaurant profile',
            data: allRestaurants
        })
    } catch (error) {
        console.log('Error in getting all Restaurants Profile')
        return res.status(500).json({
            success: false,
            message: "Server error while geting All restaurants profile",
            error: error.message
        });
    }
}   