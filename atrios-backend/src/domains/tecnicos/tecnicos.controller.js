const pool = require('../../config/db');

exports.getTecnicos = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tecnicos ORDER BY nombre ASC;');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener técnicos:', error);
    res.status(500).json({ error: 'Error al obtener personal técnico.' });
  }
};
