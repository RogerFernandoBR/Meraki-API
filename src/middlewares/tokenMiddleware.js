module.exports = async (req, res, next) => {
    if (req.headers.authorization) {
        return next()
    };
    if (req.params.authorization) {
        req.headers.authorization = `bearer ${req.params.authorization}`;
        return next();
    }
    return next();
};
