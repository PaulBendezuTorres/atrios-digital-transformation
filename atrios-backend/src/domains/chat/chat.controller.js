const chatService = require('../../services/simulatedChat.service');

exports.processChat = async (req, res) => {
  const { message, phone } = req.body;

  if (!message || !phone) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: message o phone.' });
  }

  try {
    const responseText = await chatService.chatWithAgent(phone, message);
    res.json({ response: responseText });
  } catch (error) {
    console.error('Error en el Agente de Simulación de chat:', error);
    res.status(500).json({ error: 'Error al procesar el mensaje.' });
  }
};
