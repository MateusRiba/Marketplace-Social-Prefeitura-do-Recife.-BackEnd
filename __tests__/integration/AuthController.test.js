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


describe('Testes de Integração - AuthController', () => {
    it('Deve autenticar um usuário e retornar um token', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'usuario@email.com', password: 'senha123' });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  
    it('Deve retornar erro 401 para senha incorreta', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'usuario@email.com', password: 'senhaerrada' });
  
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Credenciais inválidas');
    });
  
    it('Deve impedir acesso a rota protegida sem token', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('message', 'Token não fornecido');
    });
  });
  