const User = require('../model/User');
const { hashPassword } = require('../utils/hash');

exports.userRegistration = async (req, res) => {

    const { userName, phoneNo, password, email, category } = req.body;
    const existingUser = await User.findOne({phoneNo, email});
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: `User already registered with phoneNo: ${value.phoneNo}`
        });
    }
    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
        return res.status(400).json({
            status: false,
            message: 'Something went wrong in fetching hashPassword'
        })
    }

    try {
        const response = await User.create({ userName, phoneNo, password: hashedPassword, email, category, refreshToken: '' })
        if (!response) {
            return res.status(400).json({
                status: false,
                message: "Failed to create user after hashing"
            });
        }

        return res.status(201).json({
            status: true,
            message: "User Created Successfully",
            data: response
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error signing up",
            error: error.message
        })
    }

}