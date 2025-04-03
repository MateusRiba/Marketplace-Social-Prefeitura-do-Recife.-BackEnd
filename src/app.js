/************************************************************
 * ARQUIVO: src/app.js
 * RESPONSABILIDADE: Inicializar o servidor Express e carregar rotas
 ************************************************************/

const express = require('express');
const { sessionMiddleware, setUserSession } = require("./middlewares/sessionMiddleware");
const app = express(); //Inicialização do server
const cors = require("cors");


// Importa nossa conexão com o banco e models
const sequelize = require('./config/database');
require('./models/product');   // Carregando modelo de Produto
require('./models/favorite'); // Carregando modelo de Favorito 

// Sincroniza com o banco (cria tabelas se não existirem)
sequelize.sync({ force: true })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas: ', err);
  });

// Configura o Express para interpretar JSON do body
app.use(express.json());

// session middlewares
app.use(sessionMiddleware);
app.use(setUserSession);

app.use(cors({
  origin: "http://localhost:3008/", // Permite o frontend acessar a API
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // Permite cookies e autenticação com credenciais
}));

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true })); //aumentando tamanho max das requisicoes json

// Importa e usa as rotas
const productRoutes = require('./routes/products');
// Todas as rotas definidas em productRoutes vão ter como prefixo "/products"
app.use('/products', productRoutes);


//Importa e usa as rotas de favoritos
const favoriteRoutes = require('./routes/favorites');
app.use('/favorites', favoriteRoutes);

// Rota básica de teste
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

//Autenticação do usuário
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

//Ativação dos cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Rota para o fi
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);


// iniciar o servidor
const PORT = process.env.PORT || 3018;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


