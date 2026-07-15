const { GoogleGenerativeAI } = require("@google/generative-ai");
const pool = require("../config/db");
const fs = require("fs");
const path = require("path");
const { getCatalogByCategory } = require("./catalog.service");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Asegurar que la tabla de historial de chats exista
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS historial_chats (
        id_chat SERIAL PRIMARY KEY,
        telefono VARCHAR(20) NOT NULL,
        remitente VARCHAR(10) NOT NULL, -- 'user' o 'model'
        mensaje TEXT NOT NULL,
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_historial_chats_telefono ON historial_chats(telefono);
    `);
    console.log("Tabla de historial_chats inicializada correctamente.");
  } catch (error) {
    console.error("Error al inicializar tabla historial_chats:", error);
  }
};

initDb();

// Cargar el Prompt de Sistema Oficial de Atrios Digital
const getSystemPrompt = () => {
  try {
    const promptPath = path.join(__dirname, "../../../prompts/system_prompt.txt");
    return fs.readFileSync(promptPath, "utf8");
  } catch (error) {
    console.error("Error al cargar system_prompt.txt, usando default:", error);
    return "Eres un asistente de WhatsApp de la empresa Atrios Digital especializado en seguridad electrónica y cámaras.";
  }
};

// El catálogo de servicios ahora se consulta en tiempo real desde PostgreSQL.
// Ver: src/services/catalog.service.js

// Crear prospecto e insertar ticket inicial
const createTechnicalTicket = async (nombre_completo, direccion, telefono, detalles) => {
  try {
    const details = detalles || "Solicitud de instalación o cotización en campo";
    const res = await pool.query(
      `WITH cliente_insert AS (
        INSERT INTO clientes (nombre_completo, telefono, direccion)
        VALUES ($1, $2, $3)
        ON CONFLICT (telefono) 
        DO UPDATE SET nombre_completo = EXCLUDED.nombre_completo, direccion = EXCLUDED.direccion
        RETURNING id_cliente
      )
      INSERT INTO servicios_tecnicos (id_cliente, detalles_requerimiento, tipo_servicio, estado_servicio)
      SELECT id_cliente, $4, 'Instalación Cámaras', 'Pendiente'
      FROM cliente_insert
      RETURNING id_servicio;`,
      [nombre_completo, telefono, direccion, details]
    );

    const ticketId = res.rows[0]?.id_servicio;
    return JSON.stringify({
      success: true,
      message: `¡Registro de cliente completado! Código de ticket #${ticketId}. Ahora podemos proceder a agendar el día y la hora de tu visita técnica.`,
      ticket_id: ticketId
    });
  } catch (error) {
    console.error("Error al registrar ticket/prospecto en la BD:", error);
    return JSON.stringify({ success: false, error: "Error interno de base de datos." });
  }
};

// Cerrar ticket con evidencia (operarios en campo)
const updateTechnicalTicketEvidence = async (identificador, evidencia_url) => {
  try {
    const res = await pool.query(
      `UPDATE servicios_tecnicos
      SET estado_servicio = 'Finalizado', evidencia_url = $2, actualizado_en = CURRENT_TIMESTAMP
      WHERE id_cliente = (
          SELECT id_cliente FROM clientes 
          WHERE telefono = $1 
             OR nombre_completo ILIKE '%' || $1 || '%'
          LIMIT 1
      )
      RETURNING id_servicio;`,
      [identificador, evidencia_url]
    );

    if (res.rows.length === 0) {
      return JSON.stringify({ success: false, message: "No se encontró ningún ticket pendiente para el cliente provisto." });
    }

    return JSON.stringify({
      success: true,
      message: `El ticket de instalación #${res.rows[0].id_servicio} ha sido cerrado exitosamente con la evidencia adjuntada.`
    });
  } catch (error) {
    console.error("Error al cerrar ticket en la BD:", error);
    return JSON.stringify({ success: false, error: "Error interno al actualizar la base de datos." });
  }
};

// 1. Consultar Garantía
const checkWarranty = async (identificador) => {
  try {
    const res = await pool.query(
      `SELECT g.*, c.nombre_completo FROM garantias g
       JOIN clientes c ON g.id_cliente = c.id_cliente
       WHERE c.telefono = $1 OR c.nombre_completo ILIKE '%' || $1 || '%'
       ORDER BY g.creado_en DESC LIMIT 1`,
      [identificador]
    );
    if (res.rows.length === 0) {
      return JSON.stringify({ success: false, message: "No se encontró ningún registro de garantía para este cliente o número." });
    }
    const g = res.rows[0];
    return JSON.stringify({
      success: true,
      cliente: g.nombre_completo,
      servicio: g.servicio_asociado,
      estado: g.estado_garantia,
      fecha_inicio: g.fecha_inicio,
      meses_cobertura: g.meses_cobertura
    });
  } catch (error) {
    console.error("Error al consultar garantía:", error);
    return JSON.stringify({ success: false, error: "Error al consultar la garantía en la BD." });
  }
};

// 2. Registrar Reclamo
const createComplaint = async (identificador, detalle) => {
  try {
    let clientRes = await pool.query(
      "SELECT id_cliente FROM clientes WHERE telefono = $1 OR nombre_completo ILIKE '%' || $1 || '%' LIMIT 1",
      [identificador]
    );
    let id_cliente;
    if (clientRes.rows.length === 0) {
      const newClient = await pool.query(
        "INSERT INTO clientes (nombre_completo, telefono, direccion) VALUES ($1, $1, 'Pendiente de registrar') RETURNING id_cliente",
        [identificador]
      );
      id_cliente = newClient.rows[0].id_cliente;
    } else {
      id_cliente = clientRes.rows[0].id_cliente;
    }

    await pool.query(
      "INSERT INTO reclamos (id_cliente, detalle_reclamo, estado_reclamo) VALUES ($1, $2, 'Pendiente')",
      [id_cliente, detalle]
    );

    // Activar flag de derivación a humano
    await pool.query(
      "UPDATE clientes SET atendido_por_humano = TRUE WHERE id_cliente = $1",
      [id_cliente]
    );

    return JSON.stringify({
      success: true,
      message: "Tu queja/reclamo ha sido registrado de forma prioritaria en nuestro sistema. En este momento un asesor humano ha sido notificado para atenderte de inmediato."
    });
  } catch (error) {
    console.error("Error al registrar reclamo:", error);
    return JSON.stringify({ success: false, error: "Error al guardar el reclamo." });
  }
};

// 3. Registrar Incidencia de Soporte
const createSupportIncident = async (identificador, falla) => {
  try {
    let clientRes = await pool.query(
      "SELECT id_cliente FROM clientes WHERE telefono = $1 OR nombre_completo ILIKE '%' || $1 || '%' LIMIT 1",
      [identificador]
    );
    let id_cliente;
    if (clientRes.rows.length === 0) {
      const newClient = await pool.query(
        "INSERT INTO clientes (nombre_completo, telefono, direccion) VALUES ($1, $1, 'Pendiente de registrar') RETURNING id_cliente",
        [identificador]
      );
      id_cliente = newClient.rows[0].id_cliente;
    } else {
      id_cliente = clientRes.rows[0].id_cliente;
    }

    const res = await pool.query(
      "INSERT INTO soporte_incidencias (id_cliente, descripcion_falla, estado_incidencia, prioridad) VALUES ($1, $2, 'Registrado', 'Media') RETURNING id_incidencia",
      [id_cliente, falla]
    );

    return JSON.stringify({
      success: true,
      message: `Tu reporte de falla de soporte técnico ha sido registrado con éxito. Ticket de soporte asignado: #${res.rows[0].id_incidencia}.`,
      incidencia_id: res.rows[0].id_incidencia
    });
  } catch (error) {
    console.error("Error al registrar soporte:", error);
    return JSON.stringify({ success: false, error: "Error al registrar la incidencia de soporte." });
  }
};

// 4. Gestionar Cita
const manageAppointment = async (action, identifier, date, time, type) => {
  try {
    let clientRes = await pool.query(
      "SELECT id_cliente FROM clientes WHERE telefono = $1 OR nombre_completo ILIKE '%' || $1 || '%' LIMIT 1",
      [identifier]
    );
    if (clientRes.rows.length === 0 && action === 'schedule') {
      return JSON.stringify({ success: false, message: "Para programar una cita primero es necesario que registres tus datos completos (Nombre, Dirección y Celular)." });
    }
    const id_cliente = clientRes.rows[0]?.id_cliente;

    if (action === 'schedule') {
      const res = await pool.query(
        "INSERT INTO citas (id_cliente, fecha_cita, hora_cita, tipo_visita, estado_cita) VALUES ($1, $2, $3, $4, 'Programada') RETURNING id_cita",
        [id_cliente, date, time, type || 'Inspección Técnica']
      );
      return JSON.stringify({ success: true, message: `¡Visita técnica agendada con éxito! Programado para el ${date} a las ${time}. Código de cita #${res.rows[0].id_cita}` });
    } 
    
    if (action === 'reschedule') {
      const res = await pool.query(
        `UPDATE citas SET fecha_cita = $2, hora_cita = $3, estado_cita = 'Reprogramada'
         WHERE id_cliente = $1 AND estado_cita IN ('Programada', 'Reprogramada')
         RETURNING id_cita`,
        [id_cliente, date, time]
      );
      if (res.rows.length === 0) return JSON.stringify({ success: false, message: "No encontramos ninguna cita programada activa para reprogramar." });
      return JSON.stringify({ success: true, message: `Cita reprogramada con éxito para el ${date} a las ${time}.` });
    }

    if (action === 'cancel') {
      const res = await pool.query(
        `UPDATE citas SET estado_cita = 'Cancelada'
         WHERE id_cliente = $1 AND estado_cita IN ('Programada', 'Reprogramada')
         RETURNING id_cita`,
        [id_cliente]
      );
      if (res.rows.length === 0) return JSON.stringify({ success: false, message: "No se encontraron citas programadas activas para cancelar." });
      return JSON.stringify({ success: true, message: "Tu cita técnica ha sido cancelada correctamente en nuestro sistema." });
    }

    return JSON.stringify({ success: false, message: "Acción no reconocida." });
  } catch (error) {
    console.error("Error al gestionar cita:", error);
    return JSON.stringify({ success: false, error: "Error al procesar la cita en la base de datos." });
  }
};

// Declaración de mapeo de funciones para Gemini
const functions = {
  get_service_catalog: async (args) => {
    const categoria = args?.categoria || null;
    const result = await getCatalogByCategory(categoria);
    return { response: { content: result } };
  },
  create_technical_ticket: async (args) => {
    const { nombre_completo, direccion, telefono, detalles } = args;
    const result = await createTechnicalTicket(nombre_completo, direccion, telefono, detalles);
    return { response: { content: result } };
  },
  update_technical_ticket_evidence: async (args) => {
    const { identificador, evidencia_url } = args;
    const result = await updateTechnicalTicketEvidence(identificador, evidencia_url);
    return { response: { content: result } };
  },
  check_warranty: async (args) => {
    const { identificador } = args;
    const result = await checkWarranty(identificador);
    return { response: { content: result } };
  },
  create_complaint: async (args) => {
    const { identificador, detalle } = args;
    const result = await createComplaint(identificador, detalle);
    return { response: { content: result } };
  },
  create_support_incident: async (args) => {
    const { identificador, falla } = args;
    const result = await createSupportIncident(identificador, falla);
    return { response: { content: result } };
  },
  manage_appointment: async (args) => {
    const { action, identifier, date, time, type } = args;
    const result = await manageAppointment(action, identifier, date, time, type);
    return { response: { content: result } };
  }
};

// Definición de esquemas de funciones del SDK
const getServiceCatalogDeclaration = {
  name: "get_service_catalog",
  description: "Consulta el catálogo oficial de servicios y productos de Atrios Digital desde la base de datos. Llama a esta función cuando el cliente pregunte por precios, productos, servicios, especificaciones o disponibilidad. Puedes filtrar por categoría: 'Cámaras', 'Cercos', 'Alarmas', 'Mantenimiento', 'Soporte'. Si no se especifica categoría, devuelve todo el catálogo.",
  parameters: {
    type: "OBJECT",
    properties: {
      categoria: {
        type: "STRING",
        description: "Categoría del servicio a consultar. Valores posibles: 'Cámaras', 'Cercos', 'Alarmas', 'Mantenimiento', 'Soporte'. Dejar vacío para ver todo el catálogo."
      }
    },
    required: []
  }
};

const createTechnicalTicketDeclaration = {
  name: "create_technical_ticket",
  description: "Registra los datos obligatorios del cliente (prospecto) para servicios de instalación o cotización técnica. Llama a esta función solo si tienes Nombre Completo, Dirección Exacta y Teléfono del cliente.",
  parameters: {
    type: "OBJECT",
    properties: {
      nombre_completo: { type: "STRING", description: "Nombre completo del cliente." },
      direccion: { type: "STRING", description: "Dirección exacta del lugar de instalación." },
      telefono: { type: "STRING", description: "Número de teléfono o celular del cliente." },
      detalles: { type: "STRING", description: "Detalles adicionales del requerimiento." }
    },
    required: ["nombre_completo", "direccion", "telefono"]
  }
};

const updateTechnicalTicketEvidenceDeclaration = {
  name: "update_technical_ticket_evidence",
  description: "Registra la imagen de evidencia de finalización de un trabajo de instalación de cámaras y cierra el ticket cambiando su estado a 'Finalizado'. Requiere el identificador del cliente (nombre o teléfono) y la URL de la imagen (evidencia_url).",
  parameters: {
    type: "OBJECT",
    properties: {
      identificador: { type: "STRING", description: "Identificador del cliente (nombre completo o teléfono)." },
      evidencia_url: { type: "STRING", description: "URL de la imagen de evidencia de finalización del trabajo." }
    },
    required: ["identificador", "evidencia_url"]
  }
};

const checkWarrantyDeclaration = {
  name: "check_warranty",
  description: "Consulta la base de datos de Atrios para verificar si el cliente cuenta con garantía vigente para sus equipos e instalaciones.",
  parameters: {
    type: "OBJECT",
    properties: {
      identificador: { type: "STRING", description: "Identificador del cliente (nombre completo o teléfono celular)." }
    },
    required: ["identificador"]
  }
};

const createComplaintDeclaration = {
  name: "create_complaint",
  description: "Registra de forma prioritaria un reclamo o queja del cliente. Esto derivará automáticamente el chat con un asesor humano.",
  parameters: {
    type: "OBJECT",
    properties: {
      identificador: { type: "STRING", description: "Identificador del cliente (teléfono o nombre)." },
      detalle: { type: "STRING", description: "Detalle completo y específico de la queja o reclamo del cliente." }
    },
    required: ["identificador", "detalle"]
  }
};

const createSupportIncidentDeclaration = {
  name: "create_support_incident",
  description: "Registra un ticket de soporte técnico ante reportes de fallas de cámaras, alarmas, cercos u otros equipos de Atrios Digital.",
  parameters: {
    type: "OBJECT",
    properties: {
      identificador: { type: "STRING", description: "Número de teléfono o celular del cliente." },
      falla: { type: "STRING", description: "Descripción detallada de la falla o anomalía reportada." }
    },
    required: ["identificador", "falla"]
  }
};

const manageAppointmentDeclaration = {
  name: "manage_appointment",
  description: "Gestiona citas de visitas técnicas (agendar, reprogramar o cancelar visitas).",
  parameters: {
    type: "OBJECT",
    properties: {
      action: { type: "STRING", enum: ["schedule", "reschedule", "cancel"], description: "Acción a realizar: 'schedule' (programar nueva), 'reschedule' (reprogramar existente), 'cancel' (cancelar)." },
      identifier: { type: "STRING", description: "Número de teléfono o nombre del cliente." },
      date: { type: "STRING", description: "Fecha de la cita en formato YYYY-MM-DD." },
      time: { type: "STRING", description: "Hora de la cita en formato HH:MM (ej: '10:30')." },
      type: { type: "STRING", description: "Tipo de visita: 'Inspección Técnica', 'Instalación', 'Mantenimiento'." }
    },
    required: ["action", "identifier"]
  }
};

// Función principal para interactuar con Gemini
exports.chatWithAgent = async (phone, userMessage) => {
  // 1. Guardar mensaje del usuario
  await pool.query(
    "INSERT INTO historial_chats (telefono, remitente, mensaje) VALUES ($1, 'user', $2)",
    [phone, userMessage]
  );

  // 2. Cargar historial previo de la base de datos (últimas 6 interacciones para ahorrar tokens)
  const historyRes = await pool.query(
    `SELECT remitente, mensaje FROM (
       SELECT remitente, mensaje, creado_en FROM historial_chats
       WHERE telefono = $1
       ORDER BY creado_en DESC
       LIMIT 6
     ) sub ORDER BY creado_en ASC`,
    [phone]
  );

  // Formatear el historial para Gemini
  const formattedHistory = [];
  for (let i = 0; i < historyRes.rows.length - 1; i++) {
    const row = historyRes.rows[i];
    formattedHistory.push({
      role: row.remitente === "user" ? "user" : "model",
      parts: [{ text: row.mensaje }]
    });
  }

  // Asegurar que el primer mensaje sea siempre de rol 'user' (regla estricta del SDK de Google)
  while (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
    formattedHistory.shift();
  }

  // 3. Inicializar modelo de Gemini con sistema e instrucciones
  let dynamicSystemInstruction = getSystemPrompt();
  dynamicSystemInstruction += `\n\nREGLA ADICIONAL: El número de teléfono de la sesión de chat actual es "${phone}". NUNCA uses ni menciones este número en tus respuestas o saludos. Trata al cliente de forma neutral y cortés a menos que él se presente o te diga su nombre explícitamente en el chat actual.`;

  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite",
    systemInstruction: dynamicSystemInstruction,
    tools: [{
      functionDeclarations: [
        getServiceCatalogDeclaration,
        createTechnicalTicketDeclaration,
        updateTechnicalTicketEvidenceDeclaration,
        checkWarrantyDeclaration,
        createComplaintDeclaration,
        createSupportIncidentDeclaration,
        manageAppointmentDeclaration
      ]
    }]
  });

  // 4. Iniciar chat
  const chat = model.startChat({
    history: formattedHistory
  });

  // 5. Enviar mensaje del usuario
  let result = await chat.sendMessage(userMessage);
  let responseText = "";

  // 6. Ciclo para resolver llamadas a herramientas (function calling) si existieran
  const functionCalls = typeof result.response.functionCalls === 'function' ? result.response.functionCalls() : null;
  if (functionCalls && functionCalls.length > 0) {
    const toolResults = [];
    for (const call of functionCalls) {
      const { name, args } = call;
      console.log(`[Gemini Tool Invocation] invocando herramienta: ${name}`, args);
      if (functions[name]) {
        const resultPayload = await functions[name](args);
        toolResults.push({
          functionResponse: {
            name,
            response: resultPayload.response
          }
        });
      }
    }

    // Enviar resultados de la herramienta de regreso a Gemini para que formule la respuesta final
    if (toolResults.length > 0) {
      const followUp = await chat.sendMessage(toolResults);
      responseText = followUp.response.text();
    }
  } else {
    responseText = result.response.text();
  }

  // 7. Guardar respuesta del modelo en base de datos
  await pool.query(
    "INSERT INTO historial_chats (telefono, remitente, mensaje) VALUES ($1, 'model', $2)",
    [phone, responseText]
  );

  return responseText;
};
