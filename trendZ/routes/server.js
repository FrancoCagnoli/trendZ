const express = require('express');
const connectDB = require('./database');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes'); // Importar rutas de productos

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Servir archivos estáticos (imágenes subidas)
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api', authRoutes);
app.use('/api/productos', productRoutes); // Agregar rutas de productos

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
