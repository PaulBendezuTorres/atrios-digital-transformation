const pool = require('../../config/db');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: username o password.' });
  }

  try {
    const query = 'SELECT * FROM usuarios_portal WHERE username = $1 AND password = $2;';
    const { rows } = await pool.query(query, [username, password]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }

    const user = rows[0];
    res.json({
      success: true,
      user: {
        id_usuario: user.id_usuario,
        username: user.username,
        nombre: user.nombre,
        rol: user.rol,
        id_tecnico: user.id_tecnico
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno en el proceso de autenticación.' });
  }
};
