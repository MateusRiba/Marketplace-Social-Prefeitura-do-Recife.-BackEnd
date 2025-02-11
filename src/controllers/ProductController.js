/************************************************************
 * ARQUIVO: src/controllers/ProductController.js
 * RESPONSABILIDADE: Funções para criar, pesquisar, listar produtos
 ************************************************************/

const Product = require('../models/product');

module.exports = {
  /**
   * Cria um novo produto no banco de dados
   * 
   * - O front-end envia um POST /products
   * - O body da requisição contém: { name, price, whatsappNumber }
   */
  createProduct: async (req, res) => {
    try {
      // Extraindo dados do body da requisição
      const { name, price, whatsappNumber } = req.body;

      // Validação simples: verificar se todos os campos vieram
      if (!name || !price || !whatsappNumber) {
        return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
      }

      // Criar o produto no banco
      const newProduct = await Product.create({
        name,
        price,
        whatsappNumber
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
   * Faz uma busca de produtos pelo nome (pesquisa)
   * - O front-end faz GET /products/search?name=algo
   * - Filtra produtos que contenham "algo" no campo name
   */
  searchProducts: async (req, res) => {
    try {
      const { name } = req.query; // /products/search?name=algo
      if (!name) {
        // Se não mandou query param, retornamos todos
        const products = await Product.findAll();
        return res.json(products);
      }

      // Opção 1 (básica): filtrar todos que tenham o nome
      // contendo esse texto (LIKE)
      const products = await Product.findAll({
        where: {
          // O operador [Op.like] vem do Sequelize (importar se usar)
          // Exemplo:
          // name: { [Op.like]: `%${name}%` }
        }
      });
      // Como ainda não importamos Op, faremos algo simples:
      // Buscando todos e filtrando em memória (não ideal pra produção, mas simples):
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );

      return res.json(filtered);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
