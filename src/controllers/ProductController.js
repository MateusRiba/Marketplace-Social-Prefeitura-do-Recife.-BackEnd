/************************************************************
 * ARQUIVO: src/controllers/ProductController.js
 * RESPONSABILIDADE: Funções para criar, pesquisar, listar produtos
 ************************************************************/

const Product = require('../models/product');
const { Op } = require('sequelize');

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
        picture,
        whatsappNumber,
        linkedONG,
        units,
        price,
        description
      } = req.body;

      // Aqui é a validação de campos obrigatorios, caso algum não seja, basta retirar um desse
      if (!productName || !craftsmanName || !picture || !whatsappNumber 
          || !linkedONG || !units || !price) {
        return res.status(400).json({ 
          error: 'Campos obrigatórios ausentes. Verifique e tente novamente.' 
        });
      }

      // Criar o produto no banco usando o Model Product
      const newProduct = await Product.create({
        productName,
        craftsmanName,
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
  searchProducts: async (req, res) => {
    try {
      const { productName } = req.query; // /products/search?productName=algo

      // Se não mandou query param, retornamos todos
      if (!productName) {
        const products = await Product.findAll();
        return res.json(products);
      }

    
    // Aqui é a filtragem feita pelo OP (importado no inicio)
    const products = await Product.findAll({
      where: {
        productName: {
          [Op.like]: `%${productName}%`
        }
      }
    });
       

      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
