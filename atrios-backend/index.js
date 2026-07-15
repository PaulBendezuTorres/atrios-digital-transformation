const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas modulares
const authRoutes = require('./src/domains/auth/auth.routes');
const ticketsRoutes = require('./src/domains/tickets/tickets.routes');
const tecnicosRoutes = require('./src/domains/tecnicos/tecnicos.routes');
const chatRoutes = require('./src/domains/chat/chat.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Montar Rutas
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/tecnicos', tecnicosRoutes);
app.use('/api/chat', chatRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('Servidor API de Atrios Digital Modularizado y Activo.');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor de Atrios backend corriendo en http://localhost:${PORT}`);
});
