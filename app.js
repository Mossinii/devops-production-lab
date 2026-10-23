const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;
const pool = new Pool();

app.get('/', async (req, res) => {
  try {
    const dbResult = await pool.query('SELECT NOW()');
    res.send(`
      <div style="font-family: Arial; text-align: center; margin-top: 50px; background: #121212; color: #fff; padding: 40px; border-radius: 8px;">
        <h1 style="color: #39FF14;">Laboratório Node.js + PostgreSQL</h1>
        <p style="color: #CCCCCC;">Aplicação de demonstração executada em contêineres.</p>
        <p style="color: #007BFF;">Conexão com o banco: ${dbResult.rows[0].now}</p>
      </div>
    `);
  } catch (err) {
    console.error('Falha ao consultar o PostgreSQL:', err.message);
    res.status(503).send('<h1>Serviço temporariamente indisponível.</h1>');
  }
});

app.listen(port, () => {
  console.log(`Aplicação de demonstração ouvindo na porta ${port}`);
});
