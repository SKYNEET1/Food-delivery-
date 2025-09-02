const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.user = decode
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid Token' });
    }
}