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
 * GET /products/id
 * - Faz pesquisa de produtos por id
 * - O Front envia um parametro ?name= e recebe a lista filtrada.
 */
router.get('/:id', ProductController.searchProductById);

/**
 * DELETE /products/:id
 * Remove um produto pelo seu ID
 */
router.delete('/:id', ProductController.removeProduct);


// Atualização de produto(PUT /praducts/:id)
////////////////////////////
////////////////////////////
router.put('/:id', ProductController.updateProduct);

// Exporta o router para ser usado no app.js
module.exports = router;
