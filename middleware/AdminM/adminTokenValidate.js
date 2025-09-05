const adminTokenValidate = async(req ,res, next) => {
        
    if (!req.user || !req.user.phoneNo || !req.user.category) {
        return res.status(400).json({
            success: false,
            message: "Invalid or missing authentication details in token"
        });
    }
    const { phoneNo, category } = req.user;
    if (category !== 'admin') {
        return res.status(403).json({
            success: false,
            message: `This ${phoneNo} is not autherised to create User profile`
        })
    }

    next();
}

module.exports = adminTokenValidate