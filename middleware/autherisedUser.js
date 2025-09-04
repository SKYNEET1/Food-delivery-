const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.token) {
        token = req.cookies.token;
    }


    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.user = decode
        next();
    } catch (error) {
        if (error.message === 'jwt expired') {
            next()
        } else {
            return res.status(400).json({
                message: error.message === 'jwt expired' ? 'Access token expired' : 'Invalid Token',
                error: error.message
            });
        }
    }
}