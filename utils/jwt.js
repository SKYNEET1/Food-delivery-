const jwt = require('jsonwebtoken');

const generateToken = (id,user) => {
    return jwt.sign(
        {id,user},
        process.env.JWT_SECREATE,
        {expiresIn:'2h'}
    )
}

module.exports = generateToken