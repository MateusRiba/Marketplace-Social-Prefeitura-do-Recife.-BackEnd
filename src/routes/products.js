//Codigo para lidar com diferentes ações como listar, adicionar e remover produtos

const express = require('express');
const router = express.Router();

// Rota para listar produtos
router.get('/', (req, res) => {
    res.json([
        { id: 1, name: "Vaso de Cerâmica", price: 45.90 },
        { id: 2, name: "Tapete Artesanal", price: 89.90 }
    ]);
});

// Rota para adicionar um novo produto
router.post('/', (req, res) => {
    const { name, price } = req.body;
    res.status(201).json({ message: "Produto criado!", name, price });
});

module.exports = router;