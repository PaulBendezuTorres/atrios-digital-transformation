const geminiService = require('../../services/gemini.service');

exports.processChat = async (req, res) => {
  const { message, phone } = req.body;

  if (!message || !phone) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: message o phone.' });
  }

  try {
    const responseText = await geminiService.chatWithAgent(phone, message);
    res.json({ response: responseText });
  } catch (error) {
    console.error('Error en el Agente de IA nativo del chat:', error);
    
    if (error.status === 429 || (error.message && error.message.includes('429'))) {
      return res.json({ 
        response: "Hola. En este momento estoy recibiendo un alto volumen de consultas. Por favor, espera unos 15 segundos y escríbeme de nuevo para ayudarte. ¡Muchas gracias por tu paciencia!" 
      });
    }
    
    res.status(500).json({ error: 'Error al procesar el mensaje con el Agente de IA.' });
  }
};
