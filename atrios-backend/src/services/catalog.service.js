// catalog.service.js - Consulta el catálogo de servicios y productos de Atrios Digital desde PostgreSQL
const pool = require('../config/db');

/**
 * Obtiene todos los servicios disponibles del catálogo, con filtro opcional por categoría.
 * @param {string|null} categoria - Filtro de categoría: 'Cámaras', 'Cercos', 'Alarmas', 'Mantenimiento', 'Soporte'. Si es null, devuelve todo.
 * @returns {Promise<string>} JSON string con los servicios encontrados.
 */
const getCatalogByCategory = async (categoria = null) => {
  try {
    let query = 'SELECT categoria, nombre, descripcion, precio_desde, precio_hasta, moneda, caracteristicas FROM catalogo_servicios WHERE disponible = TRUE';
    const params = [];

    if (categoria) {
      query += ' AND LOWER(categoria) = LOWER($1)';
      params.push(categoria);
    }

    query += ' ORDER BY categoria, precio_desde';

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return JSON.stringify({
        mensaje: categoria
          ? `No encontré servicios en la categoría "${categoria}". Las categorías disponibles son: Cámaras, Cercos, Alarmas, Mantenimiento, Soporte.`
          : 'No hay servicios disponibles en este momento.'
      });
    }

    return JSON.stringify({
      total: result.rows.length,
      servicios: result.rows
    });
  } catch (err) {
    console.error('[Catalog Service] Error al consultar catálogo:', err.message);
    return JSON.stringify({ error: 'No se pudo acceder al catálogo en este momento.' });
  }
};

module.exports = { getCatalogByCategory };
