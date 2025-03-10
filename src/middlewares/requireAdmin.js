// src/middlewares/requireAdmin.js
function requireAdmin(req, res, next) {
    // Se verifyToken populou req.user e confirmamos que user tem "ngo"
    // (adapte a lógica a como você define "admin")
    if (req.user && req.user.ngo) {
      return next();
    }
    return res.status(403).json({ error: "Acesso negado: somente administradores (ONGs) podem realizar esta ação." });
  }
  
  module.exports = { requireAdmin };
  