// server.js (Servidor Local em Node.js)

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
const PORT = 3030; // Porta que o servidor irá escutar

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost', // Endereço do servidor do banco de dados MySQL
    user: 'root', // Usuário do banco de dados MySQL
    password: '', // Senha do banco de dados MySQL
    database: 'bancoteste', // Nome do banco de dados MySQL que será usado
});

// Middleware para permitir o uso de JSON nas requisições
app.use(express.json());

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

// Rota para criar um novo evento
app.post('/criar-evento', (req, res) => {
    const { nome, data } = req.body;

    // Verificar se o nome e a data foram fornecidos
    if (!nome || !data) {
        return res.status(400).json({ error: 'O nome e a data do evento são obrigatórios.' });
    }

    // Formatar a data no formato 'YYYY-MM-DD' antes de inserir no banco de dados
    const dataFormatada = new Date(data).toISOString().split('T')[0];

    // Executar uma query para inserir o novo evento no banco de dados
    const sql = 'INSERT INTO eventos (nome, data) VALUES (?, ?)';
    connection.query(sql, [nome, dataFormatada], (err, result) => {
        if (err) {
            console.error('Erro ao inserir evento no banco de dados:', err);
            res.status(500).json({ error: 'Erro ao criar evento.' });
            return;
        }

        // Evento criado com sucesso
        res.json({ message: 'Evento criado com sucesso!', id: result.insertId });
    });
});

// Rota para deletar um  evento
app.delete('/deletar-evento', (req, res) => {
    const { nome } = req.body;

    // Verificar se o nome foi fornecido
    if (!nome) {
        return res.status(400).json({ error: 'O nome do evento é obrigatório.' });
    }

    // Executar uma query para remover o evento no banco de dados
    const sql = 'delete from eventos where nome = (?)';
    connection.query(sql, [nome], (err, result) => {
        if (err) {
            console.error('Erro ao remover o evento do banco de dados:', err);
            res.status(500).json({ error: 'Erro ao remover o evento.' });
            return;
        }

        // Evento removido com sucesso
        res.json({ message: 'Evento removido com sucesso!', id: result.insertId });
    });
});

app.put('/alterar-nome-evento', (req, res) => {
    const { nomeAntigo, nomeNovo } = req.body;

    // Verificar se os nomes foram fornecidos
    if (!nomeAntigo || !nomeNovo) {
        return res.status(400).json({ error: 'Os nomes antigo e novo do evento são obrigatórios.' });
    }

    // Executar uma query para alterar o nome do evento no banco de dados
    const sql = 'UPDATE eventos SET nome = ? WHERE nome = ?';
    connection.query(sql, [nomeNovo, nomeAntigo], (err, result) => {
        if (err) {
            console.error('Erro ao alterar o nome do evento no banco de dados:', err);
            res.status(500).json({ error: 'Erro ao alterar o nome do evento.' });
            return;
        }

        // Verificar se algum registro foi afetado
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Evento não encontrado ou o nome não foi alterado.' });
            return;
        }

        // Nome do evento alterado com sucesso
        res.json({ message: 'Nome do evento alterado com sucesso!' });
    });
});

// Rota para recuperar a lista de eventos
app.get('/eventos', (req, res) => {
    // Executar uma query para obter todos os eventos do banco de dados
    const sql = 'SELECT nome, data FROM eventos';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao obter eventos do banco de dados:', err);
            res.status(500).json({ error: 'Erro ao recuperar eventos.' });
            return;
        }

        // Enviar a lista de eventos como resposta
        res.json(results);
    });
});

// PARTICIPANTES

// Rota para adicionar um novo participante
app.post('/adicionar-participante', (req, res) => {
    const { evento, nome } = req.body;

    // Verificar se o evento e o nome foram fornecidos
    if (!evento || !nome) {
        return res.status(400).json({ error: 'O nome e o evento são obrigatórios.' });
    }

    // Executar uma query para adicionar o novo participante no banco de dados
    const sql = 'INSERT INTO participantes (evento, nome) VALUES (?, ?)';
    connection.query(sql, [evento, nome], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar o participante no banco de dados:', err);
            res.status(500).json({ error: 'Erro ao adicionar participante.' });
            return;
        }

        // Participante adicionado com sucesso
        res.json({ message: 'Participante adicionado com sucesso!', id: result.insertId });
    });
});

// Rota para deletar um participante
app.delete('/deletar-participante', (req, res) => {
    const { nome } = req.body;

    // Verificar se o nome foi fornecido
    if (!nome) {
        return res.status(400).json({ error: 'O nome do participante é obrigatório.' });
    }

    // Executar uma query para remover o participante no banco de dados
    const sql = 'delete from participantes where nome = (?)';
    connection.query(sql, [nome], (err, result) => {
        if (err) {
            console.error('Erro ao remover o participante do banco de dados:', err);
            res.status(500).json({ error: 'Erro ao remover o participante.' });
            return;
        }

        // Participante removido com sucesso
        res.json({ message: 'Participante removido com sucesso!', id: result.insertId });
    });
});

// Rota para recuperar a lista de participantes
app.get('/participantes', (req, res) => {
    // Executar uma query para obter todos os participantes do banco de dados
    const sql = 'SELECT evento, nome FROM participantes';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao obter participantes do banco de dados:', err);
            res.status(500).json({ error: 'Erro ao recuperar participantes.' });
            return;
        }

        // Enviar a lista de eventos como resposta
        res.json(results);
    });
});

// Iniciar o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
