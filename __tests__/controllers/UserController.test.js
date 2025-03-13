const { getUserCookie } = require('../../src/controllers/UserController');

describe('UserController', () => {
    test('Deve retornar erro se usuário não estiver logado', async () => {
        const req = { cookies: {} }; // Simula um request sem cookies
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getUserCookie(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Nenhum dado encontrado no cookie" });
    });
});
