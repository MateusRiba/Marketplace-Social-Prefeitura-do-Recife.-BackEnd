// src/middlewares/verifyToken.js
const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../models/TokenBlacklist");

const verifyToken = async (req, res, next) => {
  try {
    // Pega o token do Header: Authorization: "Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Acesso negado. Nenhum token fornecido." });
    }

    // Verifica se esse token está na blacklist
    const tokenInBlacklist = await TokenBlacklist.findOne({ where: { token } });
    if (tokenInBlacklist) {
      return res.status(401).json({ error: "Token inválido ou revogado." });
    }

    // Decodifica e verifica a assinatura do JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "seuSegredoJWT");
    // Exemplo de decoded: { email: user.email, name: user.name, ngo: "NomeDaONG", iat, exp }

    req.user = decoded; 
    next(); // Prossegue
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};

module.exports = { verifyToken };
