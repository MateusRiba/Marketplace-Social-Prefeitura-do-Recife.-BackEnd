const { getProductsByCategory } = require('../../src/controllers/ProductController');

describe('ProductController', () => {
    test('Deve retornar erro se nenhuma categoria for fornecida', async () => {
        const req = { params: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await getProductsByCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Categoria inválida. Escolha entre: Utensílios, Decoração ou Vestimentas' });

    });
});