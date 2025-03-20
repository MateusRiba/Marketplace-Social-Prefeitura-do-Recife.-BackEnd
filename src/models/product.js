/************************************************************
 * ARQUIVO: src/models/Product.js
 * RESPONSABILIDADE: Definir o modelo (tabela) de Produto
 ************************************************************/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Favorite = require('./favorite');


// Colunas do Banco de Dados:

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  // ProductName: Exemplo de nome do produto
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  craftsmanName: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  // Category: Categoria do produto.
  category:{
    type: DataTypes.STRING,
    allowNull: false
  },
  // Picture: .Blob long
  picture: {
    type: DataTypes.BLOB, 
    allowNull: true
  },

  // WhatsappNumber (se for realmente esse o nome)
  // mas provavelmente é WhatsAppNumber
  whatsappNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // LinkedONG: Exemplo de campo que indica ONG relacionada
  linkedONG: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Tamanho: Tamanho do produto
  size: {
    type: DataTypes.ENUM('P', 'M', 'G'),
    allowNull:true
  },

  // Avalible (ex-Units): Quantidade disponível
  avalible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },

  // Price: Preço unitário
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },

  // Description: Descrição longa do produto
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }

}, {
  // Configurações extras
  tableName: 'products',  // Se quiser definir explicitamente o nome da tabela
  timestamps: true        // Cria colunas "createdAt" e "updatedAt" automaticamente
});

//Relacionamentos
Product.hasMany(Favorite, { foreignKey: 'productId' });
Favorite.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Product;
