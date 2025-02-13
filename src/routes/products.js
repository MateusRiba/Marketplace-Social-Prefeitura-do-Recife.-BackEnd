/************************************************************
 * ARQUIVO: src/routes/productRoutes.js
 * RESPONSABILIDADE: Definição das rotas de Produto e Favoritos
 ************************************************************/
const express = require('express');
const router = express.Router();

// Importar nosso controller
const ProductController = require('../controllers/ProductController');

/**
 * POST /products
 * - Cria um novo produto.
 * - O Front chama essa rota quando um usuário cadastra um novo produto.
 */
router.post('/', ProductController.createProduct);

/**
 * GET /products
 * - Retorna todos os produtos disponíveis.
 * - O Front consome para mostrar a lista inicial de produtos na tela.
 */
router.get('/', ProductController.getAllProducts);

/**
 * GET /products/search
 * - Faz pesquisa de produtos por nome.
 * - O Front envia um parametro ?name= e recebe a lista filtrada.
 */
router.get('/search', ProductController.searchProducts);

/**
 * GET /favorites
 * - Retorna a lista de favoritos de um usuário.
 * - Exemplo: /favorites?userId=1
 */
//router.get('/favorites', ProductController.getFavorites);

// Exportamos o router para ser usado no app.js
module.exports = router;
