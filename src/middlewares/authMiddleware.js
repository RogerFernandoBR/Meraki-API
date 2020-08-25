const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const config = require("../../config/config");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ errors: { MongoError: "Token não informado!" } });

    const [, token] = authHeader.split(" ");

    try {
        const decoded = await promisify(jwt.verify)(token, config.TOKEN_SECRET);
        req.id = decoded.id;
        return next();
    } catch {
        return res.status(401).json({ errors: { MongoError: "Token inválido!" } });
    }
};
