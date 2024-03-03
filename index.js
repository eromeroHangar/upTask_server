import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

// Llamado del Servidor
const app = express();
app.use(express.json());
// Poder usar Variables de entorno
dotenv.config();
// Importación de la conección a la DB
conectarDB();
// Configurar CORS
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No permitido
      callback(new Error('Error de CORS'));
    }
  },
};

app.use(cors(corsOptions));

// Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);

const PORT = process.env.PORT || 4000;
// Levantando y Escuchando el Servidor
const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Socket.io
import { Server } from 'socket.io';

const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL
  }
});

io.on('connection', socket => {
  // console.log('Conectado a socket.io');

  // Definir los eventos de socket.io
  socket.on('abrir proyecto', idProyecto => {
    socket.join(idProyecto);
  });

  socket.on('nueva tarea', tarea => {
    const proyecto = tarea.proyecto;
    socket.on(proyecto).emit('tarea agregada', tarea);
  });

  socket.on('eliminar tarea', tarea => {
    const proyecto = tarea.proyecto;
    socket.on(proyecto.emit('tarea eliminada', tarea));
  });

  socket.on('actualizar tarea', tarea => {
    const proyecto = tarea.proyecto._id;
    socket.on(proyecto.emit('tarea actualizada', tarea));
  });

  socket.on('cambiar estado', tarea => {
    const proyecto = tarea.proyecto._id;
    socket.on(proyecto.emit('nuevo estado', tarea));
  });
});
