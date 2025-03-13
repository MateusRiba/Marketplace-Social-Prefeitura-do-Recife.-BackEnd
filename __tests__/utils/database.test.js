const sequelize = require('../../src/config/database');

describe('Database Connection', () => {
    test('Deve conectar ao banco de dados corretamente', async () => {
        await expect(sequelize.authenticate()).resolves.not.toThrow();
    });
        afterAll(async () => {
        await sequelize.close(); // Fecha a conexão após os testes
    });
});
