import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'http://localhost:5173/',
  'https://uptaskclient.netlify.app/'
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      // Puede consultar la API
      return callback(null, true);
    }

    if(!origin) {
      // Puede consultar la API
      return callback(null, true);
    }

    // No permitido
    return callback(new Error('Error de CORS'));
  }
})