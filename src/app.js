/************************************************************
 * ARQUIVO: src/app.js
 * RESPONSABILIDADE: Inicializar o servidor Express e carregar rotas
 ************************************************************/

const express = require('express');
const { sessionMiddleware } = require("./middlewares/sessionMiddleware");
const app = express(); //Inicialização do server

// Importa nossa conexão com o banco e models
const sequelize = require('./config/database');
require('./models/product');   // Carregando modelo de Produto
require('./models/Favorite'); // Carregando modelo de Favorito 

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

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


