import express from 'express';
import userController from './controllers/userController.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authController from './controllers/authControllers.js'
const app = express();

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API usuarios',
      version: '1.0.0',
      description: 'Documentación de la API usando Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./controllers/*.js'], // Ruta donde están tus controladores o archivos de rutas
};

// Definir las IPs o dominios permitidos
const allowedOrigins = ['35.160.120.126'];

// Configurar las opciones de CORS
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin)) {
          callback(null, true);  // Permitir si el origen está en la lista
        } else {
          callback(new Error('Acceso no permitido por CORS'));  // Bloquear si no está en la lista
        }
      },
  optionsSuccessStatus: 204 // Estado para respuestas pre-flight (OPCIONAL)
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors(corsOptions));  // Aplicar el middleware de CORS con las opciones
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authController);
app.use('/api', userController);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

