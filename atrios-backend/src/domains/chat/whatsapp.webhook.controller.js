const geminiService = require("../../services/gemini.service");
const pool = require("../../config/db");

// Helper para validar si el momento actual está dentro del horario laboral oficial
// Lunes a Viernes: 8:00 AM - 6:00 PM
// Sábado: 8:00 AM - 1:00 PM
// Domingo: Cerrado
const isWithinWorkingHours = () => {
  const now = new Date();
  
  // Convertir a hora de Lima/Bogotá (UTC-5)
  const offset = -5;
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const localDate = new Date(utc + (3600000 * offset));
  
  const day = localDate.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const hours = localDate.getHours();
  const minutes = localDate.getMinutes();
  const currentTimeDec = hours + minutes / 60;

  if (day === 0) {
    return false; // Domingo cerrado
  }
  if (day === 6) {
    // Sábado: 8:00 AM - 1:00 PM (13.0)
    return currentTimeDec >= 8 && currentTimeDec <= 13;
  }
  // Lunes a Viernes: 8:00 AM - 6:00 PM (18.0)
  return currentTimeDec >= 8 && currentTimeDec <= 18;
};

// Enviar mensaje de texto a través de Evolution API
const sendWhatsAppMessage = async (instance, number, text) => {
  const evolutionUrl = `http://localhost:8080/message/sendText/${instance}`;
  try {
    const response = await fetch(evolutionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.EVOLUTION_API_KEY || "AtriosGlobalAPIKey2026"
      },
      body: JSON.stringify({
        number: number,
        options: {
          delay: 1500,
          presence: "composing"
        },
        textMessage: {
          text: text
        }
      })
    });
    if (!response.ok) {
      const errText = await response.text();
      console.error(`Error al enviar mensaje por Evolution API (${response.status}):`, errText);
    } else {
      console.log(`Mensaje enviado exitosamente a ${number} por Evolution API.`);
    }
  } catch (error) {
    console.error("Error en fetch de envío a Evolution API:", error);
  }
};

exports.handleWhatsAppWebhook = async (req, res) => {
  const { event, instance, data } = req.body;

  // Responder de inmediato a Evolution API para evitar retardo o reintentos
  res.status(200).send({ status: "received" });

  // Solo procesar si el evento es de mensajería entrante
  if (event !== "messages.upsert") {
    return;
  }

  const key = data?.key;
  if (!key || key.fromMe) {
    // Si no hay clave de mensaje o el mensaje es propio (enviado desde el bot), ignorar para evitar bucles
    return;
  }

  const remoteJid = key.remoteJid;
  const phone = remoteJid.split("@")[0];

  // Extraer el texto del mensaje entrante soportando múltiples formatos de Evolution API
  let messageText = "";
  if (data.message) {
    messageText = data.message.conversation || 
                  data.message.extendedTextMessage?.text || 
                  data.message.imageMessage?.caption || 
                  "";
  }

  if (!messageText || messageText.trim() === "") {
    return;
  }

  console.log(`[WhatsApp Webhook] Mensaje recibido de ${phone}: "${messageText}"`);

  try {
    // 1. Verificar si el cliente está en modo de "derivación humana"
    const clientQuery = await pool.query(
      "SELECT atendido_por_humano FROM clientes WHERE telefono = $1",
      [phone]
    );
    
    if (clientQuery.rows.length > 0 && clientQuery.rows[0].atendido_por_humano) {
      console.log(`[WhatsApp Webhook] Mensaje de ${phone} ignorado porque está derivado a un asesor humano.`);
      return;
    }

    // 2. Evaluar horario laboral
    const withinHours = isWithinWorkingHours();
    if (!withinHours) {
      console.log(`[WhatsApp Webhook] Mensaje de ${phone} recibido fuera de horario laboral.`);
      
      // Guardar el mensaje del usuario en el historial
      await pool.query(
        "INSERT INTO historial_chats (telefono, remitente, mensaje) VALUES ($1, 'user', $2)",
        [phone, messageText]
      );

      // Responder con mensaje informativo de fuera de horario
      const outOfHoursMsg = "Hola. Gracias por comunicarte con Atrios Digital. En este momento nos encontramos fuera de nuestro horario oficial de atención (Lunes a Viernes de 8am a 6pm y Sábados de 8am a 1pm). Tu mensaje ha sido registrado de forma segura y un asesor humano te responderá de inmediato al iniciar el próximo turno laboral. ¡Que tengas un excelente día!";
      
      await pool.query(
        "INSERT INTO historial_chats (telefono, remitente, mensaje) VALUES ($1, 'model', $2)",
        [phone, outOfHoursMsg]
      );

      await sendWhatsAppMessage(instance, phone, outOfHoursMsg);
      return;
    }

    // 3. Procesar mensaje con Gemini
    let botResponse = "";
    try {
      botResponse = await geminiService.chatWithAgent(phone, messageText);
    } catch (geminiError) {
      console.error("Error al invocar servicio de Gemini desde Webhook:", geminiError);
      
      // Manejar el error 429 de cuota agotada
      if (geminiError.status === 429 || (geminiError.message && geminiError.message.includes("429"))) {
        botResponse = "Hola. En este momento estoy recibiendo un alto volumen de consultas de otros clientes. Por favor, regálame unos 15 segundos y escríbeme de nuevo para poder ayudarte de inmediato. ¡Muchas gracias por tu paciencia!";
      } else {
        botResponse = "Hola. Disculpa, he tenido un inconveniente técnico temporal al procesar tu consulta. Por favor intenta escribirme de nuevo en unos momentos.";
      }
    }

    // 4. Enviar la respuesta por WhatsApp usando Evolution API
    await sendWhatsAppMessage(instance, phone, botResponse);

  } catch (error) {
    console.error("Error crítico procesando mensaje del Webhook de WhatsApp:", error);
  }
};
