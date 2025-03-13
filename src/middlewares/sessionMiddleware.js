// sessionMiddleware.js
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

// Configuração básica de sessão em memória (não recomendada em produção).
// Em produção, use Redis ou outro store persistente.
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'minhaChaveDeSessao',
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({
    checkPeriod: 86400000 // limpa dados de 1 em 1 dia
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 1 // 1 hora, por exemplo
  }
});

req.session.user = {
    id: userId,
    role: 'user'
  };
  

module.exports = { sessionMiddleware };
