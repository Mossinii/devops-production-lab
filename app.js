const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', async (req, res) => {
  try {
    const dbResult = await pool.query('SELECT NOW()');
    res.send(`
      <div style="font-family: Arial; text-align: center; margin-top: 50px; background: #121212; color: #fff; padding: 40px; border-radius: 8px;">
        <h1 style="color: #39FF14;">🚀 NETZ Staging Environment - Online!</h1>
        <p style="color: #CCCCCC;">Deploy automatizado via CI/CD e Podman.</p>
        <p style="color: #007BFF;">Status do Banco de Dados: Conectado com sucesso em ${dbResult.rows[0].now}</p>
      </div>
    `);
  } catch (err) {
    res.send(`<h1>Erro ao conectar no banco: ${err.message}</h1>`);
  }
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
