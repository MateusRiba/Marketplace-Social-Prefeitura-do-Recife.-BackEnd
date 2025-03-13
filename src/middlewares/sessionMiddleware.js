const session = require("express-session");
const MemoryStore = require("memorystore")(session);

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'minhaChaveDeSessao',
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore({
    checkPeriod: 86400000 // limpa dados de 1 em 1 dia
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 1 // 1 hora
  }
});

// Middleware para definir sessão corretamente
const setUserSession = (req, res, next) => {
  if (!req.session) {
    return res.status(500).json({ error: "Erro na sessão" });
  }

  req.session.user = req.session.user || {
    id: "123",
    role: "user"
  };

  next();
};

module.exports = { sessionMiddleware, setUserSession };
