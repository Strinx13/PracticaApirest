import express from 'express';
import userController from './controllers/userController.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import authController from './controllers/authControllers.js';

const app = express();


// Configurar las opciones de CORS
const corsOptions = {
  origin: function (origin, callback) {
      // Aquí defines la lista de orígenes permitidos
      const allowedOrigins = ['http://35.160.120.126']; 
      
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
          callback(null, true);
      } else {
          callback(new Error('No autorizado por CORS'));
      }
  }
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authController);
app.use('/api', userController);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

