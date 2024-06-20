require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Apenas necessário se o seu banco de dados requer SSL e você está usando um certificado autoassinado
  },
});

module.exports = { pool };
