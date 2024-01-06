
const instructorAuthorize = (req, res, next) => {
    try {
        if (req.decoded.role !== ('admin' || 'instructor')) {
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

module.exports = instructorAuthorize;
