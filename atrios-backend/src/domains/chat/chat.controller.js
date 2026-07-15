exports.processChat = async (req, res) => {
  const { message, phone } = req.body;

  if (!message || !phone) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: message o phone.' });
  }

  try {
    const n8nUrl = 'http://localhost:5678/webhook/webhook-whatsapp';
    const response = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        phone,
        source: 'web',
        remoteJid: `${phone}@s.whatsapp.net`,
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n respondió con estado: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error en proxy del chat a n8n:', error);
    res.status(500).json({ error: 'Error al procesar el mensaje con el Agente de IA.' });
  }
};
