import express from 'express';
import {
  registrar,
  autenticar,
  confirmar,
  olvideContraseña,
  comprobarToken,
  nuevaContraseña,
  perfil,
} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// Autenticación, Registro y Confirmacion de Usuarios
router.post('/', registrar); // Crear un nuevo usuario
router.post('/login', autenticar); // Autentificando Usuario
router.get('/confirmar/:token', confirmar);
router.post('/olvide-contrasena', olvideContraseña);
router.route('/olvide-contrasena/:token').get(comprobarToken).post(nuevaContraseña);
router.get('/perfil', checkAuth, perfil);

export default router;
