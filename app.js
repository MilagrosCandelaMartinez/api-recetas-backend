const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar conexión a base de datos
const connectDB = require('./src/db/conexion');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'API CRUD MongoDB - Proyecto Final',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      users: '/api/users',
      auth: '/api/auth'
    }
  });
});
// Rutas principales
app.use('/api/products', require('./src/routes/productRoute'));
app.use('/api/categories', require('./src/routes/categoryRoute'));
app.use('/api/users', require('./src/routes/userRoute'));
app.use('/api/auth', require('./src/routes/authRoute'));

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada'
  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📖 API disponible en: http://localhost:${PORT}`);
});