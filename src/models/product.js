/************************************************************
 * ARQUIVO: src/models/Product.js
 * RESPONSABILIDADE: Definir o modelo (tabela) de Produto
 ************************************************************/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Favorite = require('./Favorite');


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

  // Picture: URL ou caminho da imagem do produto
  picture: {
    type: DataTypes.STRING, //OBS: Não está decidido se será.blob ou as imagens vão ser guardadas como LINKS
    allowNull: false
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

  // Units: Quantidade disponível
  units: {
    type: DataTypes.INTEGER,
    allowNull: false
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
