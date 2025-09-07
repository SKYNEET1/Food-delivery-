const Menu = require('../../model/Menu');
const Orders = require('../../model/Orders');
const Resturant = require('../../model/Resturant');

exports.orderFood = async (req, res) => {

    try {
        const { params, body, _id } = req.validateData
        const { restaurant_id, menu_id } = params
        const { foodStatus, paymentStatus, items } = body

        if (!restaurant_id || !menu_id) {
            return res.status(400).json({
                success: false,
                message: 'Can not fetch the value from req.params'
            })
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Items are required",
            });
        }

        const isRestaurant = await Resturant.findOne({ _id: restaurant_id });
        if (!isRestaurant) {
            return res.status(400).json({
                success: false,
                message: 'No such restaurant available'
            })
        }

        const isMenu = await Menu.findOne({ _id: menu_id });
        if (!isMenu) {
            return res.status(400).json({
                success: false,
                message: 'Please give a valid menu'
            })
        }

        if (isMenu.restaurant.toString() !== restaurant_id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'Please choose menu from owned restaurant'
            })
        }

        // const FoodItem = isMenu.foodProvided
        //     .filter(item => item.isAvailable)
        //     .map((item) => ({
        //         quantity: item.quantity,
        //         foodItem: item._id,
        //         price: item.price
        //     }))
        let total = 0;

        for (const item of items) {
            // find the food in available list
            // const found = FoodItem.find(f => f.foodItem.toString() === item.foodItem);
            const found = isMenu.foodProvided.id(item.foodItem)
            if (!found) {
                return res.status(400).json({
                    success: false,
                    message: `Food item ${item.foodItem} does not exist`
                });
            }

            if (!found.isAvailable) {
                return res.status(400).json({
                    success: false,
                    message: `Food item ${found.foodName} is not available`
                });
            }

            if (item.quantity > found.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Quantity exceeded for item ${item.foodItem}`
                });
            }

            // if valid, add to total cost
            total += found.price * item.quantity;
            // and - the quantity
            found.quantity -= item.quantity;
        }
        await isMenu.save();

        const order = await Orders.create({
            customer: _id,
            restaurant: isRestaurant._id,
            items,
            totalCost: total,
            foodStatus: foodStatus || "Placed",
            deliveryAgent: null,
            paymentStatus: paymentStatus || "Unpaid"
        })

        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Order could not be placed",
            });

        }

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        console.log('order food--->', error.message)
        return res.status(500).json({
            success: false,
            message: "Server error while fetching from DB",
            error: error.message
        });
    }

}
