const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || 'atrios_crm',
  user: process.env.DB_USER || 'atrios_admin',
  password: process.env.DB_PASSWORD || 'AtriosSecure2026!',
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error conectando a la base de datos PostgreSQL en src/config/db.js:', err.stack);
  } else {
    console.log(`Conexión exitosa a PostgreSQL: ${process.env.DB_DATABASE || 'atrios_crm'}`);
    release();
  }
});

module.exports = pool;
