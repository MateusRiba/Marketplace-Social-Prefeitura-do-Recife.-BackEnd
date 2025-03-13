const { login } = require('../../src/controllers/AuthController');

describe('AuthController', () => {
    test('Deve retornar erro se email e senha não forem fornecidos', async () => {
        const req = { body: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Email e senha são obrigatórios' });
    });
});