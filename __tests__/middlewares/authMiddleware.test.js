const { verifyToken } = require('../../src/middlewares/authMiddleware');


describe('authMiddleware', () => {
    test('Deve retornar erro se o token não for fornecido', () => {
        const req = { headers: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        verifyToken(req, res, next);


        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token não fornecido' });
    });
});