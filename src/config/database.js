const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const { Sequelize } = require('sequelize');

// Debug para verificar se o dotenv carregou corretamente
console.log("✅ DB_DIALECT:", process.env.DB_DIALECT);
console.log("✅ DB_PORT:", process.env.DB_PORT);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        dialect: process.env.DB_DIALECT || 'postgres',
        logging: false,
        define: {
          schema: 'produtos_sociais'  
        }
    }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexão estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('❌ Não foi possível conectar ao banco:', error);
  });

module.exports = sequelize;
