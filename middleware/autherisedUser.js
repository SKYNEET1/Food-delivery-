const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
        token = req.cookies.token;
    }

    console.log("token from cookies autheriseduser",token)
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    
    try {
        const decode = jwt.verify(token, process.env.JWT_KEY)
        console.log(decode)
        req.user = decode
        next();
    } catch (error) {
        console.log(error)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Access token expired. Please refresh your token.',
                expiredAt: error.expiredAt
            });
        }
        return res.status(400).json({
            success: false,
            message: 'Invalid token',
            error: error.message
        });
    }
}