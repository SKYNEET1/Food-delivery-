const jwt = require('jsonwebtoken');

const generateAccessToken = (phoneNo, category) => {
    return jwt.sign(
        { phoneNo, category },
        process.env.JWT_KEY,
        { expiresIn: '2h' }
    )
}

const generateRefreshToken = (phoneNo, category) => {
    return jwt.sign(
        { phoneNo, category },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: '7d' }
    )
}

module.exports = { generateAccessToken, generateRefreshToken }