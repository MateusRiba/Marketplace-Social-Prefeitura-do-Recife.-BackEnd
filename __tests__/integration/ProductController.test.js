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


describe('Testes de Integração - ProductController', () => {
  it('Deve retornar todos os produtos com status 200', async () => {
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('Deve criar um novo produto', async () => {
    const newProduct = {
      productName: "Teste Produto",
      category: "Utensílios",
      price: 49.99
    };

    const response = await request(app).post('/products').send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Deve buscar um produto pelo ID', async () => {
    const response = await request(app).get('/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('Deve retornar erro 404 ao buscar um produto inexistente', async () => {
    const response = await request(app).get('/products/9999');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Produto não encontrado.');
  });
});
