//Aqui é a criação do server

const express = require('express'); //Importa o Express 
const app = express(); //Cria uma instância do servidor

app.use(express.json()); //Para permitir receber requisições com JSON

// Rota básica de teste
app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

// Define a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//As Requisições para /products serão tratadas pelo products.js
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);