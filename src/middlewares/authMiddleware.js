const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../models/TokenBlacklist");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Acesso negado" });
        }

        // Verifica se o token está na blacklist
        const tokenInBlacklist = await TokenBlacklist.findOne({ where: { token } });
        if (tokenInBlacklist) {
            return res.status(401).json({ error: "Token inválido" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "seuSegredoJWT");
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};

module.exports = { verifyToken };
