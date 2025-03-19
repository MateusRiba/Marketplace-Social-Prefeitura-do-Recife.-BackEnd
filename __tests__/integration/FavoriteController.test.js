const request = require('supertest');
const app = require('../../src/app');


let server;

beforeAll((done) => {
  server = app.listen(3001, () => {  // Alterando a porta para evitar conflitos
    console.log("Servidor de teste rodando na porta 3001");
    done();
  });
});

afterAll((done) => {
  server.close(() => {
    console.log("Servidor de teste encerrado");
    done();
  });
});


describe('Testes de Integração - FavoriteController', () => {
    it('Deve adicionar um produto aos favoritos', async () => {
      const response = await request(app)
        .post('/favorites/add')
        .send({ userId: 1, productId: 2 });
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Produto adicionado aos favoritos');
    });
  
    it('Deve listar os favoritos de um usuário', async () => {
      const response = await request(app).get('/favorites?userId=1');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  
    it('Deve impedir adição duplicada do mesmo favorito', async () => {
      await request(app).post('/favorites/add').send({ userId: 1, productId: 2 });
      const response = await request(app).post('/favorites/add').send({ userId: 1, productId: 2 });
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Este produto já está nos favoritos.');
    });
  });
  