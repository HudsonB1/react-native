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

// Rota para criar um novo evento
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
            console.error('Erro ao romver o evento do banco de dados:', err);
            res.status(500).json({ error: 'Erro ao remover o evento.' });
            return;
        }

        // Evento criado com sucesso
        res.json({ message: 'Evento removido com sucesso!', id: result.insertId });
    });
});


// Rota para recuperar a lista de eventos
app.get('/nome-eventos', (req, res) => {
    // Executar uma query para obter todos os eventos do banco de dados
    const sql = 'SELECT nome FROM eventos';
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

// Iniciar o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
