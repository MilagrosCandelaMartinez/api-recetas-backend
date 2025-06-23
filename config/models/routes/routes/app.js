// app.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Importa cors
require('dotenv').config(); // Carga las variables de entorno

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json({ extended: false }));

// Ruta de prueba
app.get('/', (req, res) => res.send('API de Recetas Fitness corriendo'));

// Definir rutas de la API
app.use('/api/recetas', require('./routes/recetas'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(Servidor corriendo en el puerto ${PORT}));