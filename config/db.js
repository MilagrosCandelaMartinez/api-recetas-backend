// config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Carga las variables de entorno

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado exitosamente');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Sale del proceso si hay un error
  }
};

module.exports = connectDB;