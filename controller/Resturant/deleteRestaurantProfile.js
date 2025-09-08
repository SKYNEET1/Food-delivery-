const Resturant = require("../../model/Resturant")


exports.deleteRestaurantProfile = async (req, res, next) => {
    try {
        const { phoneNo } = req.user
        const targetedRestaurant = await Resturant.findOneAndUpdate(
            { phoneNo, isDeleted: false },
            { isDeleted: true },
            { new: true }
        )
        if (!targetedRestaurant) {
            return res.status(400).json({
                success: false,
                message: 'Restaurant not found or already deleted'
            })
        }

        return res.status(200).json({
            success: true,
            message: "Restaurant profile deleted successfully",
            data: targetedRestaurant
        });
    } catch (error) {
        console.error("Error deleting restaurant:", error);
        return res.status(500).json({
            success: false,
            message: "Server error in deleting restaurant",
            error: error.message
        });
    }
}