const DeliveryProfile = require("../../model/DeliveryProfile");
const Orders = require("../../model/Orders");
const { comparePassword } = require("../../utils/hash");

exports.confirmOtp = async (req, res) => {
    try {
        const { _id } = req.user
        const { otp, orderId } = req.body;
        if (!otp || !orderId) {
            return res.status(400).json({
                success: false,
                message: "OTP and orderId are required",
            });
        }

        const order = await Orders.findById({ _id: orderId });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        const isValid = await comparePassword(otp.toString(), order.otp.toString());
        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        order.foodStatus = "Delivered";
        if (order.paymentStatus === "Unpaid") {
            order.paymentStatus = "Paid";
        }

        // Free up delivery agent
        const agent = await DeliveryProfile.findById({ _id })
        if (!agent) {
            return res.status(400).json({
                success: false,
                message: "Agent can't be fetched from DB",
            });
        }
        if (agent.availability === false) {
            agent.availability = true;
            await order.save();
        }

        await order.save();
        await agent.save();

        return res.status(200).json({
            success: true,
            message: "Order confirmed and marked as Delivered",
            order,
        });

    } catch (error) {

        console.error("confirmOtp error:", error.message, error);
        return res.status(500).json({
            success: false,
            message: "Server error while confirming OTP",
            error: error.message,
        });

    }

}