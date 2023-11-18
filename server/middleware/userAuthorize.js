require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userAuthorize = (req, res, next) => {
    try {
        const bearer = req.headers.authorization;
        if (!bearer) return res.status(401).json({
            error: "Unauthorized access!",
            logout: true
        });

        const token = bearer.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({
                error: "Forbidden access!",
                logout: true
            });
            const user = await User.findOne({ _id: decoded.id });
            if (!user) return res.status(404).json({
                error: "User isn't exist!",
                logout: true,
                notExist: true
            });
            req.decoded = user;
            next();
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = userAuthorize;