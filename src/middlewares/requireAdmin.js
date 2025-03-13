// src/middlewares/requireAdmin.js
function requireAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ error: "Acesso negado: apenas administradores." });
}


  
  module.exports = { requireAdmin };
  