import express from 'express';
import userController from './controllers/userController.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authController from './controllers/authControllers.js'
import dotenv from 'dotenv'; // Importa dotenv
dotenv.config(); // Carga las variables de entorno
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(','); // Divide las URLs por comas
const token = process.env.TOKEN; // Obtiene el token de las variables de entorno


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
// Configurar las opciones de CORS para permitir todas las IPs
const corsOptions = {
  origin: true, // Permitir todas las direcciones IP
  optionsSuccessStatus: 204
};



const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors(corsOptions));  // Aplicar el middleware de CORS con las opciones
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authController);
app.use('/api', userController);
// Ejemplo de uso del token en una ruta
app.get('/api/token', (req, res) => {
    res.json({ token });
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

