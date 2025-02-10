/************************************************************
 * ARQUIVO: src/models/Product.js
 * RESPONSABILIDADE: Definir o modelo (tabela) de Produto
 * TABELA: products (por padrão, Sequelize pluraliza)
 ************************************************************/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Cria-se aqui um "model" chamado 'Product'.
 * O Sequelize vai criar a tabela 'products' no banco, com as colunas definidas.
 */

const Product = sequelize.define('Product', { // SERÁ NECESSÁRIO DEFINIR ISSO!!!
  // Cada chave do objeto define uma coluna da tabela
  id: {
    type: DataTypes.INTEGER,      // Tipo inteiro
    autoIncrement: true,          // Auto-incremento para IDs
    primaryKey: true              // Chave primária
  },
  name: {
    type: DataTypes.STRING,       // Coluna do tipo string
    allowNull: false              // Não pode ser nulo (OBRIGATÓRIO)
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),  // Exemplo de preço com 2 casas decimais
    allowNull: false
  },
  whatsappNumber: {
    type: DataTypes.STRING,       // Ex.: "+55 81 99999-9999"
    allowNull: false,
    field: 'whatsapp_number'      // Personaliza o nome da coluna se desejar
  }
}, {
  // Configurações extras
  tableName: 'products',  // Nome da tabela no banco, caso queira forçar
  timestamps: true         // Cria colunas createdAt e updatedAt automaticamente
});

module.exports = Product;
