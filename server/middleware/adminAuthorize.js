
const adminAuthorize = (req, res, next) => {
    try {
        if (req.decoded.role !== 'admin') {
            return res.status(403).json({
                error: "You are not allowed!",
                logout: true
            })
        };
        next();
    } catch (error) {
        next(error)
    }
};

module.exports = adminAuthorize;
