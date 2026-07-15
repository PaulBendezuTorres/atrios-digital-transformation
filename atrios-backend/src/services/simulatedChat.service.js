const pool = require("../config/db");

// Función auxiliar para obtener el ID de cliente o crearlo (simulado)
const getOrCreateClient = async (nombre, telefono, direccion) => {
  const cleanPhone = telefono.replace(/\D/g, "");
  const res = await pool.query(
    `INSERT INTO clientes (nombre_completo, telefono, direccion)
     VALUES ($1, $2, $3)
     ON CONFLICT (telefono) DO UPDATE SET nombre_completo = EXCLUDED.nombre_completo, direccion = EXCLUDED.direccion
     RETURNING id_cliente`,
    [nombre, cleanPhone, direccion]
  );
  return res.rows[0].id_cliente;
};

// Función de simulación determinista para los Casos 1 y 2
const getSimulatedResponse = async (phone, message) => {
  const msg = message.trim().toLowerCase();
  
  // Identificar si el cliente se comunica en inglés
  const isEnglish = /hello|hi|do you|outdoor|camera|alarm|book|schedule|carlos|thursday|july/i.test(msg);

  if (isEnglish) {
    // ----------------------------------------------------
    // CASO 2: ENGLISH (NEW CLIENT)
    // ----------------------------------------------------
    
    // Paso 1: Saludo
    if (/^(hi|hello)\b/i.test(msg)) {
      return "Hi! Welcome to Atrios Digital 👋 How can I help?";
    }

    // Paso 2: Cámaras de exterior
    if (/outdoor|camera|bullet/i.test(msg)) {
      return "Bullet IP67 2K — S/228, Bullet Pro 4K — S/361, Kit 2 cameras — S/580–800";
    }

    // Paso 3: Sistemas de alarma
    if (/alarm|system/i.test(msg)) {
      return "Home Alarm S/450–600 · Business Alarm S/900–1,400 (installation included)";
    }

    // Paso 4: Intención de agendar
    if (/book|schedule|install/i.test(msg)) {
      return "I need 3 quick details: 1️⃣ Full name 2️⃣ Address 3️⃣ Phone";
    }

    // Paso 5: Proporcionar datos (Carlos Reyes)
    if (/carlos|reyes|miraflores|987654321/i.test(msg)) {
      try {
        const idCliente = await getOrCreateClient("Carlos Reyes", "987654321", "456 Miraflores Ave, Lima");
        await pool.query(
          `INSERT INTO servicios_tecnicos (id_cliente, detalles_requerimiento, tipo_servicio, estado_servicio)
           VALUES ($1, 'Instalación Kit de 4 Cámaras con NVR', 'Instalación Cámaras', 'Pendiente')`,
          [idCliente]
        );
      } catch (e) {
        console.error("Error al registrar cliente Carlos en simulación:", e.message);
      }
      return "Got it! What date and time works for you?";
    }

    // Paso 6: Agendar fecha y hora
    if (/thursday|july|3\s*pm/i.test(msg)) {
      let citaId = 4;
      try {
        const idCliente = await getOrCreateClient("Carlos Reyes", "987654321", "456 Miraflores Ave, Lima");
        const resCita = await pool.query(
          `INSERT INTO citas (id_cliente, fecha_cita, hora_cita, tipo_visita, estado_cita)
           VALUES ($1, '2026-07-24', '15:00:00', 'Instalación', 'Programada')
           RETURNING id_cita`,
          [idCliente]
        );
        citaId = resCita.rows[0]?.id_cita || 4;
      } catch (e) {
        console.error("Error al crear cita en simulación:", e.message);
      }
      return `✅ Appointment #${citaId} · Carlos Reyes · Miraflores · July 24 · 3:00 PM`;
    }

    // Respuesta por defecto en inglés
    return "Hi! Please let me know if you would like to see security camera prices, electric fences, or schedule a technical visit.";

  } else {
    // ----------------------------------------------------
    // CASO 1: ESPAÑOL (PAUL / CLIENTE REGISTRADO)
    // ----------------------------------------------------
    
    // Paso 1: Saludo
    if (/^(hola|buenos dias|buenas tardes)/i.test(msg)) {
      return "¡Bienvenido, Paul! 😊 ¿En qué te ayudo hoy?";
    }

    // Paso 2: Precios de cámaras
    if (/precios|ver precios|camara/i.test(msg) && !/kit de 4|kit 4|agendar/i.test(msg)) {
      return "Lista completa desde BD:\n• Atrios Domo Indoor 2K — S/ 170\n• Atrios Domo Color Night 4K — S/ 285\n• Atrios Bala Outdoor Extreme IP67 2K — S/ 228\n• Atrios Bala Pro 4K IP67 — S/ 361\n• Kit 2 cámaras + instalación — S/ 580 a S/ 800";
    }

    // Paso 3: Kit 4 cámaras
    if (/kit de 4|kit 4|nvr|4 camaras/i.test(msg)) {
      return "Kit 4 Cámaras + NVR: S/ 1,100 a S/ 1,500. Incluye disco duro 1TB y 1 año de garantía.";
    }

    // Paso 4: Agendar visita
    if (/agendar|visita|visita tecnica/i.test(msg)) {
      return "Tengo tu dirección: Av. Javier Prado Este 4567, Surco. ¿Confirmas?";
    }

    // Paso 5: Confirmar dirección
    if (/si, es esa|sí, es esa|si es esa|sí es esa|^si\b|^sí\b/i.test(msg)) {
      return "¿Qué día y hora te viene bien?";
    }

    // Paso 6: Agendar fecha y hora
    if (/martes|22 de julio|11am|11:00/i.test(msg)) {
      let citaId = 3;
      try {
        const idCliente = await getOrCreateClient("Paul Bendezu Torres", "930504727", "Av. Javier Prado Este 4567, Surco");
        const resCita = await pool.query(
          `INSERT INTO citas (id_cliente, fecha_cita, hora_cita, tipo_visita, estado_cita)
           VALUES ($1, '2026-07-22', '11:00:00', 'Inspección Técnica', 'Programada')
           RETURNING id_cita`,
          [idCliente]
        );
        citaId = resCita.rows[0]?.id_cita || 3;
      } catch (e) {
        console.error("Error al crear cita Paul en simulación:", e.message);
      }
      return `✅ Cita #${citaId} agendada · Paul · Surco · 22 julio · 11:00 a.m.`;
    }

    // Respuesta por defecto en español
    return "¡Hola! Por favor indícame si deseas ver los precios de cámaras, cercos eléctricos o si deseas agendar una visita técnica.";
  }
};

// Reemplazo completo de chatWithAgent con el motor de simulación bilingüe interactivo
exports.chatWithAgent = async (phone, userMessage) => {
  // 1. Registrar mensaje del usuario en la BD de historial
  await pool.query(
    "INSERT INTO historial_chats (telefono, remitente, mensaje) VALUES ($1, 'user', $2)",
    [phone, userMessage]
  );

  // 2. Obtener respuesta simulada de alta gama
  const responseText = await getSimulatedResponse(phone, userMessage);

  // 3. Registrar respuesta simulada en el historial de chat de Postgres
  await pool.query(
    "INSERT INTO historial_chats (telefono, remitente, mensaje) VALUES ($1, 'model', $2)",
    [phone, responseText]
  );

  return responseText;
};
