const pool = require('../../config/db');

// Obtener todos los tickets
exports.getTickets = async (req, res) => {
  try {
    const query = `
      SELECT 
        s.id_servicio,
        s.tipo_servicio,
        s.detalles_requerimiento,
        s.estado_servicio,
        s.evidencia_url,
        s.fecha_agenda,
        s.actualizado_en,
        c.nombre_completo AS cliente_nombre,
        c.telefono AS cliente_telefono,
        c.direccion AS cliente_direccion,
        t.nombre AS tecnico_nombre,
        t.telefono AS tecnico_telefono
      FROM servicios_tecnicos s
      JOIN clientes c ON s.id_cliente = c.id_cliente
      LEFT JOIN tecnicos t ON s.id_tecnico = t.id_tecnico
      ORDER BY s.actualizado_en DESC;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener tickets:', error);
    res.status(500).json({ error: 'Error interno al obtener tickets.' });
  }
};

// Crear un ticket
exports.createTicket = async (req, res) => {
  const { nombre_completo, telefono, direccion, detalles } = req.body;

  if (!nombre_completo || !telefono || !direccion) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: nombre_completo, telefono o direccion.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const clientQuery = `
      INSERT INTO clientes (nombre_completo, telefono, direccion)
      VALUES ($1, $2, $3)
      ON CONFLICT (telefono) DO UPDATE 
      SET nombre_completo = EXCLUDED.nombre_completo, direccion = EXCLUDED.direccion
      RETURNING id_cliente;
    `;
    const clientRes = await client.query(clientQuery, [nombre_completo, telefono, direccion]);
    const id_cliente = clientRes.rows[0].id_cliente;

    const ticketQuery = `
      INSERT INTO servicios_tecnicos (id_cliente, detalles_requerimiento, estado_servicio)
      VALUES ($1, $2, 'Pendiente')
      RETURNING *;
    `;
    const ticketRes = await client.query(ticketQuery, [id_cliente, detalles || 'Instalación de cámaras de seguridad']);
    
    await client.query('COMMIT');
    res.status(201).json(ticketRes.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al crear ticket:', error);
    res.status(500).json({ error: 'Error al procesar el registro del ticket.' });
  } finally {
    client.release();
  }
};

// Actualizar un ticket
exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const { estado_servicio, id_tecnico, evidencia_url } = req.body;

  try {
    let updateFields = [];
    let values = [];
    let valIndex = 1;

    if (estado_servicio !== undefined) {
      updateFields.push(`estado_servicio = $${valIndex++}`);
      values.push(estado_servicio);
    }

    if (id_tecnico !== undefined) {
      updateFields.push(`id_tecnico = $${valIndex++}`);
      values.push(id_tecnico === '' ? null : id_tecnico);
    }

    if (evidencia_url !== undefined) {
      updateFields.push(`evidencia_url = $${valIndex++}`);
      values.push(evidencia_url);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No se enviaron campos para actualizar.' });
    }

    values.push(id);
    const query = `
      UPDATE servicios_tecnicos
      SET ${updateFields.join(', ')}, actualizado_en = CURRENT_TIMESTAMP
      WHERE id_servicio = $${valIndex}
      RETURNING *;
    `;

    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Servicio técnico no encontrado.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al actualizar ticket:', error);
    res.status(500).json({ error: 'Error al actualizar el ticket.' });
  }
};
