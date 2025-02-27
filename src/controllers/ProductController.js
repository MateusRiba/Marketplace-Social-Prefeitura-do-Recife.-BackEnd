/************************************************************
 * ARQUIVO: src/controllers/ProductController.js
 * RESPONSABILIDADE: Funções para criar, pesquisar, listar produtos
 ************************************************************/

const Product = require('../models/product');
const { Op } = require('sequelize');
const validCategories = ['Utensílios', 'Decoração', 'Vestimentas'];

module.exports = {
  /**
   * Cria um novo produto no banco de dados
   * 
   * - O front-end envia um POST /products
   * - O body da requisição contém todos os campos abaixo
   */
  createProduct: async (req, res) => {
    try {
      // Extraindo dados do body da requisição
      const { 
        productName,
        craftsmanName,
        category,
        picture,
        whatsappNumber,
        linkedONG,
        units,
        price,
        description
      } = req.body;

      // Aqui é a validação de campos obrigatorios, caso algum não seja, basta retirar um desse
      if (!productName || !craftsmanName ||!category || !picture || !whatsappNumber 
          || !linkedONG || !units || !price) {
        return res.status(400).json({ 
          error: 'Campos obrigatórios ausentes. Verifique e tente novamente.' 
        });
      }

      // Criar o produto no banco usando o Model Product
      const newProduct = await Product.create({
        productName,
        craftsmanName,
        category,
        picture,
        whatsappNumber,
        linkedONG,
        units,
        price,
        description
      });

      return res.status(201).json(newProduct);
    } catch (error) {
      // Em caso de erro, retornamos status 500
      return res.status(500).json({ error: error.message });
    }
  },

  /**
   * Lista todos os produtos disponíveis
   * - O front-end faz um GET /products
   * - Recebe uma lista JSON de todos os produtos
   */
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  /**
   * Faz uma busca de produtos pelo nome do produto (productName)
   * - O front-end faz GET /products/search?productName=algo
   * - Filtra produtos que contenham "algo" no campo productName
   */

searchProductById: async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'O ID do produto é obrigatório.' });
    }

    // Busca o produto pelo ID
    const product = await Product.findByPk(id);


    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
},

  // Buscar produtos por categoria
  getProductsByCategory: async (req, res) => {
    const { category } = req.params;

    // Validação: Verifica se a categoria é válida
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: 'Categoria inválida. Escolha entre: Utensílios, Decoração ou Vestimentas'})
    }

    try {
      const products = await Product.findAll({
        where: { category }
      });

      if (products.length === 0) {
        return res.status(404).json({ message: 'Nenhum produto encontrado para esta categoria.' });
      }

      return res.status(200).json(products);
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

/**
 * Remove um produto pelo ID
 * - O front-end faz DELETE /products/:id
 * - É necessário passar o ID do produto na rota
 */
removeProduct: async (req, res) => {
  try {
    // Pega o ID da URL. Ex: /products/5 => req.params.id = "5"
    const { id } = req.params;

    // Verifica se o produto existe no banco
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Deleta o registro
    await product.destroy();

    // Retorna uma mensagem de sucesso
    return res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
},

/**
 * Atualiza um produto pelo ID
 * - O front-end faz PUT /products/:id
 * - O body da requisição contém os campos que devem ser atualizados
 */
updateProduct: async (req, res) => {
  try {
    // Pega o ID da URL (exemplo: /products/5)
    const { id } = req.params;

    // Verifica se o ID foi enviado
    if (!id) {
      return res.status(400).json({ error: 'O ID do produto é obrigatório.' });
    }

    // Busca o produto pelo ID
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    // Atualiza o produto com os campos enviados no corpo da requisição
    // Aqui usamos o método update do Sequelize, que atualiza somente os campos enviados.
    const updatedProduct = await product.update(req.body);

    // Retorna o produto atualizado
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
},

};
