const { createFavorite } = require('../../src/controllers/FavoriteController');


describe('FavoriteController', () => {
    test('Deve retornar erro se usuário não for autenticado', async () => {
        const req = { user: null, body: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await createFavorite(req, res);


        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Usuário não autenticado' });
    });
});