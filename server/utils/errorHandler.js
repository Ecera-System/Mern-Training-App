const errorHandler = (err, req, res, next) => {
    // if (err.name === 'MulterError') return res.status(413).send("Maximum upload file size: 10 MB");
    return res.status(500).json({ error: err.message });
};

module.exports = errorHandler;