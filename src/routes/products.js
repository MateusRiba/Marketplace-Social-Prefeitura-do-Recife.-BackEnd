/************************************************************
 * ARQUIVO: src/routes/productRoutes.js
 * RESPONSABILIDADE: Definição das rotas de Produto e Favoritos
 ************************************************************/
const express = require('express');
const router = express.Router();

// Importar nosso controller
const ProductController = require('../controllers/ProductController');

// Importa middlewares de autorização
const { verifyToken } = require('../middlewares/verifyToken');
const { requireAdmin } = require('../middlewares/requireAdmin');


/**
 * POST /products
 * - Cria um novo produto.
 * - O Front chama essa rota quando um usuário cadastra um novo produto.
 * - (somente admin)
 */
router.post('/', verifyToken, requireAdmin, ProductController.createProduct);

/**
 * GET /products
 * - Retorna todos os produtos disponíveis.
 * - O Front consome para mostrar a lista inicial de produtos na tela.
 */
router.get('/', ProductController.getAllProducts);

/**
 * GET /products/search
 * - Busca produtos pelo nome (parcial e case-insensitive).
 */
router.get('/search', ProductController.searchProductsByName);

/**
 * GET /products/id
 * - Faz pesquisa de produtos por id
 * - O Front envia um parametro ?name= e recebe a lista filtrada.
 */
router.get('/:id', ProductController.searchProductById);

/**
 * GET /products/id
 * - Faz pesquisa de produtos por id
 * - O Front envia um parametro ?name= e recebe a lista filtrada.
 */
router.get('/category/:category', ProductController.getProductsByCategory);

/**
 * GET /products/price/maxprice
 * - Faz pesquisa de produtos pelo preço máximo
 * - O Front envia um parametro ?name= e recebe a lista filtrada.
 */
router.get('/price/:maxPrice', ProductController.getProductsByPrice);

/**
 * GET /products/size/size
 * - Faz pesquisa de produtos pelo size 
 * - O Front envia um parametro ?name= e recebe a lista filtrada.
 */
router.get('/size/:size', ProductController.getProductsBySize);

/**
 * DELETE /products/:id
 * Remove um produto pelo seu ID
 * Apenas Admin
 */
router.delete('/:id', ProductController.removeProduct);


/* Atualização de produto(PUT /praducts/:id)
* Somente Admin
*
*/
router.put('/:id', verifyToken, requireAdmin, ProductController.updateProduct);

// Exporta o router para ser usado no app.js
module.exports = router;
