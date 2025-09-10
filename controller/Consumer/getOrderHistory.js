const Orders = require("../../model/Orders");

exports.getOrderHistory = async (req, res) => {
    try {
        const { _id } = req.user;
        const orders = await Orders.find({ customer: _id },"-otp -paymentStatus")
            .sort({ createdAt: -1 });
        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No order history found for consumer ${_id}`
            });
        }
        return res.status(200).json({
            success: true,
            message: `Successfully fetched Order History of Consumer ${_id}: `,
            data: orders
        })
    } catch (error) {
        console.log(error,error.message)
        return res.status(500).json({
            success: false,
            message: "Server error while fetching order history",
            error: error.message
        });
    }
}