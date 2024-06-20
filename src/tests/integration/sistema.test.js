const request = require('supertest');
const app = require('../../index'); // ajuste o caminho conforme a estrutura do seu projeto

let token;

beforeEach(async () => {
    // Renovar o token JWT antes de cada teste
    const response = await request(app)
        .post('/login')
        .send({
            email: 'bernardodtomasi@gmail.com',
            senha: '123456'
        });

    token = response.body.token;
});

//
// CLINICAS
//

describe('Testes para rota POST /clinicas', () => {
    it('Deve adicionar uma nova clínica', async () => {
        const novaClinica = {
            nome: 'Nome da Clínica',
            cep: '12345678',
            numpredio: '123',
            telefone: '(11)98765-4321',
            descricao: 'Descrição da Clínica'
        };

        const response = await request(app)
            .post('/clinicas')
            .set('Authorization', `${token}`)
            .send(novaClinica);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.status).toBe('success');
    });
});

describe('Testes para rota PUT /clinicas', () => {
    it('Deve atualizar uma clínica', async () => {
        // Primeiro, adiciona uma clínica para poder deletá-la
        const novaClinica = {
            nome: 'Clinica de atualizar',
            cep: '12345678',
            numpredio: '123',
            telefone: '(11)99999-9999',
            descricao: 'Descrição da Clínica de Teste'
        };

        // Realiza o POST para adicionar a clínica
        const responseAdd = await request(app)
            .post('/clinicas')
            .set('Authorization', `${token}`)
            .send(novaClinica);

        expect(responseAdd.status).toBe(200);
        expect(responseAdd.body.status).toBe('success');
        expect(responseAdd.body.objeto).toHaveProperty('codigo');
        codigoClinica = responseAdd.body.objeto.codigo; // armazena o código da clínica adicionada

        const atualizaClinica = {
            codigo: `${codigoClinica}`,
            nome: 'Nome da atualizar',
            cep: '12345678',
            numpredio: '123',
            telefone: '(11)98765-4321',
            descricao: 'Descrição da Clínica'
        };

        const response = await request(app)
            .put('/clinicas')
            .set('Authorization', `${token}`)
            .send(atualizaClinica);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.status).toBe('success');
    });
});

describe('Testes para rota DEL /clinicas', () => {
    it('Deve remover uma clínica existente', async () => {
        // Primeiro, adiciona uma clínica para poder deletá-la
        const novaClinica = {
            nome: 'Clinica para delete',
            cep: '12345678',
            numpredio: '123',
            telefone: '(11)99999-9999',
            descricao: 'Descrição da Clínica de Teste'
        };

        // Realiza o POST para adicionar a clínica
        const responseAdd = await request(app)
            .post('/clinicas')
            .set('Authorization', `${token}`)
            .send(novaClinica);

        expect(responseAdd.status).toBe(200);
        expect(responseAdd.body.status).toBe('success');
        expect(responseAdd.body.objeto).toHaveProperty('codigo');
        console.log(responseAdd)
        codigoClinica = responseAdd.body.objeto.codigo; // armazena o código da clínica adicionada

        // Agora, faz o DELETE para remover a clínica adicionada
        const responseDelete = await request(app)
            .delete(`/clinicas/${codigoClinica}`)
            .set('Authorization', `${token}`);

        expect(responseDelete.status).toBe(200);
        expect(responseDelete.body.status).toBe('success');
    });
});

describe('Testes para rota GET /clinicas', () => {
    it('Deve retornar todas as clínicas', async () => {
        const response = await request(app)
            .get('/clinicas')
            .set('Authorization', `${token}`); // Passa o token JWT como cabeçalho

        // Verificações dos resultados dos testes
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0); // Verifica se retornou pelo menos uma clínica
    });
    it('Deve retornar uma clínica existente pelo código', async () => {
        const responseGet = await request(app)
            .get(`/clinicas/1`)
            .set('Authorization', `${token}`);

        expect(responseGet.status).toBe(200);
        expect(responseGet.body).toHaveProperty('codigo', 1);
    });
});

//
// MEDICOS
//
describe('Testes para rota GET /medicos', () => {
    it('Deve retornar todas os médicos', async () => {
        const response = await request(app)
            .get('/medicos')
            .set('Authorization', `${token}`); 

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    it('Deve retornar um médico existente pelo código', async () => {
        const responseGet = await request(app)
            .get(`/medicos/1`)
            .set('Authorization', `${token}`);

        expect(responseGet.status).toBe(200);
        expect(responseGet.body).toHaveProperty('codigo', 1);
    });
});

describe('Testes para rota POST /medicos', () => {
    it('Deve adicionar um novo médico', async () => {
        const novoMedico = {
            cpf: '123.456.789-12',
            crm: '654321',
            nome: 'teste add',
            especialidade: 'teste',
            telefone: '(54)99907-1310',
            clinica: 1
        };

        const response = await request(app)
            .post('/medicos')
            .set('Authorization', `${token}`)
            .send(novoMedico);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.status).toBe('success');
    });
});

describe('Testes para rota PUT /medicos', () => {
    it('Deve atualizar um medico', async () => {
        const novoMedico = {
            cpf: '123.456.789-12',
            crm: '654321',
            nome: 'teste add',
            especialidade: 'teste',
            telefone: '(54)99907-1310',
            clinica: 1
        };

        const responseAdd = await request(app)
            .post('/medicos')
            .set('Authorization', `${token}`)
            .send(novoMedico);

        expect(responseAdd.status).toBe(200);
        expect(responseAdd.body.status).toBe('success');
        expect(responseAdd.body.objeto).toHaveProperty('codigo');
        codigoMedico = responseAdd.body.objeto.codigo;

        const atualizaMedico = {
            codigo: codigoClinica,
            cpf: '123.456.789-12',
            crm: '654321',
            nome: 'teste add',
            especialidade: 'teste',
            telefone: '(54)99907-1310',
            clinica: 1
        };

        const response = await request(app)
            .put('/medicos')
            .set('Authorization', `${token}`)
            .send(atualizaMedico);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.status).toBe('success');
    });
});

describe('Testes para rota DEL /medicos', () => {
    it('Deve remover um médico existente', async () => {
        const novoMedico = {
            cpf: '123.456.789-12',
            crm: '654321',
            nome: 'teste add',
            especialidade: 'teste',
            telefone: '(54)99907-1310',
            clinica: 1
        };

        const responseAdd = await request(app)
            .post('/medicos')
            .set('Authorization', `${token}`)
            .send(novoMedico);

        expect(responseAdd.status).toBe(200);
        expect(responseAdd.body.status).toBe('success');
        expect(responseAdd.body.objeto).toHaveProperty('codigo');
        console.log(responseAdd)
        codigoMedico = responseAdd.body.objeto.codigo;

        const responseDelete = await request(app)
            .delete(`/medicos/${codigoMedico}`)
            .set('Authorization', `${token}`);

        expect(responseDelete.status).toBe(200);
        expect(responseDelete.body.status).toBe('success');
    });
});