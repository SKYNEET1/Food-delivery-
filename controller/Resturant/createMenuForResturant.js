const Resturant = require('../../model/Resturant');
const User = require('../../model/User');
const Menu = require('../../model/Menu')

exports.createMenuForRestaurant = async (req, res) => {

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
        if (!isRestaurant) {
            return res.status(400).json({
                success: false,
                message: `The user ID: ${phoneNo} is not registered in Restaurant`
            })
        }

        if (isRestaurant.isDeleted === true) {
            return res.status(400).json({
                success: false,
                message: `The user ID: ${phoneNo} has been deleted`
            })
        }

        const normalized = {
            foodName: value.foodName.trim().toLowerCase(),
            description: value.description.trim().toLowerCase(),
        }

        const isMenu = await Menu.findOne({ restaurant: isRestaurant._id })
        if (!isMenu) {
            const menu = await Menu.create({
                restaurant: isRestaurant._id,
                foodProvided: [
                    { ...value, rating: 0 }
                ]
            })

            if (!menu) {
                return res.status(400).json({
                    success: false,
                    message: 'Error in adding a new food list to a new menu'
                })
            }

            return res.status(201).json({
                success: true,
                message: "Restaurant profile created successfully",
                data: menu
            });
        }

        const duplicateMenu = await Menu.findOne({
            restaurant: isRestaurant._id,
            foodProvided: {
                $elemMatch: {
                    foodName: normalized.foodName,
                    description: normalized.description,
                }
            },
        });

        if (duplicateMenu) {
            return res.status(400).json({
                success: false,
                message: 'The food items are already added',
                data: normalized
            })
        } else {
            const menu = await Menu.findOneAndUpdate(
                { restaurant: isRestaurant._id },
                { $push: { foodProvided: { ...value, rating: 0 } } },
                { new: true }
                // { upsert: true } //If a document matches your query, MongoDB updates that document.
                //If no document matches, MongoDB inserts a new document using the query and update data.
            )

            if (!menu) {
                return res.status(400).json({
                    success: false,
                    message: 'Error in adding a new food list to esisting menu'
                })
            }
            if (isRestaurant.menu !== menu._id) {

                isRestaurant.menu = menu._id;
                await isRestaurant.save();

            } else {
                console.log('menu id there')
            }


            return res.status(201).json({
                success: true,
                message: "Restaurant profile created successfully",
                data: menu
            });
        }

    } catch (error) {
        console.error("Error creating restaurant:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}
