const express = require('express');
const connectDB = require('./database');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Rutas
app.use('/api', authRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
