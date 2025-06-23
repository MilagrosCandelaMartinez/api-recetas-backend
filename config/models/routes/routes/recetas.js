// routes/recetas.js
const express = require('express');
const router = express.Router();
const Receta = require('../models/Receta');

// @route   GET /api/recetas
// @desc    Obtener todas las recetas
// @access  Public
router.get('/', async (req, res) => {
  try {
    const recetas = await Receta.find();
    res.json(recetas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// @route   GET /api/recetas/:id
// @desc    Obtener una receta por ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const receta = await Receta.findById(req.params.id);
    if (!receta) {
      return res.status(404).json({ msg: 'Receta no encontrada' });
    }
    res.json(receta);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Receta no encontrada' });
    }
    res.status(500).send('Error del servidor');
  }
});

// @route   POST /api/recetas
// @desc    Crear una nueva receta
// @access  Public (puedes añadir autenticación más tarde)
router.post('/', async (req, res) => {
  const { titulo, categoria, ingredientes, instrucciones, tiempoDeCoccion, calorias, color, tiempoDePreparacion } = req.body;

  try {
    const nuevaReceta = new Receta({
      titulo,
      categoria,
      ingredientes,
      instrucciones,
      tiempoDeCoccion,
      calorias,
      color,
      tiempoDePreparacion
    });

    const receta = await nuevaReceta.save();
    res.status(201).json(receta); // 201 Created
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// @route   PUT /api/recetas/:id
// @desc    Actualizar una receta
// @access  Public
router.put('/:id', async (req, res) => {
  const { titulo, categoria, ingredientes, instrucciones, tiempoDeCoccion, calorias, color, tiempoDePreparacion } = req.body;

  // Construye el objeto de campos a actualizar
  const recetaFields = {};
  if (titulo) recetaFields.titulo = titulo;
  if (categoria) recetaFields.categoria = categoria;
  if (ingredientes) recetaFields.ingredientes = ingredientes;
  if (instrucciones) recetaFields.instrucciones = instrucciones;
  if (tiempoDeCoccion) recetaFields.tiempoDeCoccion = tiempoDeCoccion;
  if (calorias) recetaFields.calorias = calorias;
  if (color) recetaFields.color = color;
  if (tiempoDePreparacion) recetaFields.tiempoDePreparacion = tiempoDePreparacion;


  try {
    let receta = await Receta.findById(req.params.id);

    if (!receta) {
      return res.status(404).json({ msg: 'Receta no encontrada' });
    }

    receta = await Receta.findByIdAndUpdate(
      req.params.id,
      { $set: recetaFields },
      { new: true } // Retorna el documento actualizado
    );

    res.json(receta);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Receta no encontrada' });
    }
    res.status(500).send('Error del servidor');
  }
});

// @route   DELETE /api/recetas/:id
// @desc    Eliminar una receta
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const receta = await Receta.findById(req.params.id);

    if (!receta) {
      return res.status(404).json({ msg: 'Receta no encontrada' });
    }

    await Receta.deleteOne({ _id: req.params.id });

    res.json({ msg: 'Receta eliminada' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Receta no encontrada' });
    }
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;