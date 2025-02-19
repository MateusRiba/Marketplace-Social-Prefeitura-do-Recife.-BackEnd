/************************************************************
 * ARQUIVO: src/config/database.js
 * RESPONSABILIDADE: Configuração da conexão com o MySQL
 * BIBLIOTECAS: Sequelize (construído em cima de mysql2) --> Serve para ter uma conexão mais facil com SQL usando javascript (e não SQL puro)
 ************************************************************/

const { Sequelize } = require('sequelize');

//Não tenho certeza se isso é aqui...
require('dotenv').config();
console.log('DB_DIALECT:', process.env.DB_DIALECT);

/**
 * Aqui cria-se uma instância do Sequelize, que vai se conectar
 * ao banco de dados MySQL chamado 'marketplace_db'.
 * 
 * - database: marketplace_db (foi criado no terminal do SQL)
 * - username e password: [Redacted]
 * - host: 'localhost' (pois estou rodando localmente)
 * - dialect: 'mysql' (pois estou usando o MySQL)
 */
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, { //Nome do banco, usuario e senha do .env
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

// Teste de conexão
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o MySQL foi estabelecida');
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao MySQL:', error);
  });

module.exports = sequelize; // Exportar para usar em outros arquivos
