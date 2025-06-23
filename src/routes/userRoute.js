const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middleware/verifyToken');

// Solo admin puede ver lista completa de usuarios
router.get('/', verifyToken, verifyAdmin, userController.getAllUsers);

// Usuario logueado puede ver perfil específico (debería validar que sea su propio perfil o admin)
router.get('/:id', verifyToken, userController.getUserById);

// Crear usuario es público (para permitir registro)
router.post('/', userController.createUser);

// Usuario puede actualizar su perfil (debería validar que sea su propio perfil o admin)
router.put('/:id', verifyToken, userController.updateUser);

// Solo admin puede eliminar usuarios
router.delete('/:id', verifyToken, verifyAdmin, userController.deleteUser);

module.exports = router;