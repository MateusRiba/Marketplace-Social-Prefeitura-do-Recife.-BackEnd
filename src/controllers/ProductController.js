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
        avalible,
        price,
        description,
        size,
      } = req.body;

      // Aqui é a validação de campos obrigatorios, caso algum não seja, basta retirar um desse
      if (!productName || !craftsmanName ||!category || !picture || !whatsappNumber 
          || !linkedONG || !price) {
        return res.status(400).json({ 
          error: 'Campos obrigatórios ausentes. Verifique e tente novamente.' 
        });
      }

      // Converte a imagem base64 para Buffer
      const pictureBuffer = Buffer.from(picture, 'base64');
      // Converte "avalible" em boolean
      const booleanAvalible = (avalible === 'true' || avalible === true);

      // Criar o produto no banco usando o Model Product
      const newProduct = await Product.create({
        productName,
        craftsmanName,
        category,
        picture: pictureBuffer,
        whatsappNumber,
        linkedONG,
        avalible: booleanAvalible,
        price,
        description,
        size
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
      const formattedProducts = products.map(product => ({
        ...product.toJSON(),
        picture: product.picture ? `data:image/jpeg;base64,${product.picture.toString('base64')}` : null //formatacao para o front exibir a imagem
      }));
      return res.json(formattedProducts);
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

// Buscar produtos pelo preço máximo
getProductsByPrice: async (req, res) => {
  try {
    const { maxPrice } = req.params; 
    if (!maxPrice || isNaN(maxPrice)) {
      return res.status(400).json({ error: 'O preço máximo deve ser um número válido.' });
    }

    const products = await Product.findAll({
      where: { price: { [Op.lte]: parseFloat(maxPrice) } }
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado abaixo desse preço.' });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
},

// Buscar produtos pelo tamanho
getProductsBySize: async (req, res) => {
  try {
    const { size } = req.params;
    const validSizes = ['P', 'M', 'G'];

    if (!validSizes.includes(size)) {
      return res.status(400).json({ message: 'Tamanho inválido. Escolha entre: P, M ou G.' });
    }

    const products = await Product.findAll({
      where: { size }
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado para este tamanho.' });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
 * Busca produtos pelo nome (ou parte do nome)
 * - O front-end faz GET /products/search?name=algo
 */
searchProductsByName: async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'O nome para a busca é obrigatório.' });
    }

    const products = await Product.findAll({
      where: {
        productName: {
          [Op.iLike]: `%${name}%`, // Busca parcial e case-insensitive
        },
      },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'Nenhum produto encontrado com esse nome.' });
    }

    return res.status(200).json(products);
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
    // 1. Pega o ID do produto na rota
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'O ID do produto é obrigatório.' });
    }

    // 2. Busca o produto no banco
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    // 3. Preparar objeto com os campos que serão atualizados
    //    Clonamos o req.body para manipular com mais segurança
    const updatedFields = { ...req.body };

    // 3.1. Converter disponivel (string) em boolean
    //      Se o front mandar "disponivel": "true" ou "false", convertemos:
    if (updatedFields.avalible !== undefined) {
      updatedFields.avalible = (
        updatedFields.avalible === 'true' || 
        updatedFields.avalible === true
      );
    }

    // 3.2. Converter picture (base64) em buffer (BLOB)
    //      Se o front enviar `picture` como string base64
    if (updatedFields.picture) {
      const base64Image = updatedFields.picture;
      const bufferImage = Buffer.from(base64Image, 'base64');
      updatedFields.picture = bufferImage;
    }

    // 3.3. Exemplo: se tiver "size" (ENUM 'P','M','G'), 
    //      você pode validar, se quiser:
    if (updatedFields.size) {
      const validsizes = ['P', 'M', 'G'];
      if (!validsizes.includes(updatedFields.size)) {
        return res.status(400).json({
          error: `Tamanho inválido. Valores permitidos: ${validsizes.join(', ')}.`
        });
      }
    }

    // 4. Atualiza somente os campos que vieram
    const updatedProduct = await product.update(updatedFields);

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
},


};
