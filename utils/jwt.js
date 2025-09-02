const jwt = require('jsonwebtoken');

const generateToken = (phoneNo,category) => {
    return jwt.sign(
        {phoneNo,category},
        process.env.JWT_KEY,
        {expiresIn:'2h'}
    )
}

module.exports = generateToken