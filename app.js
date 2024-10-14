import express from 'express';
import userController from './controllers/userController.js'; // Cambiado a userController
import morgan from 'morgan'; // Middleware para registro de solicitudes HTTP
import bodyParser from 'body-parser'; // Middleware para analizar cuerpos de las solicitudes
import cors from 'cors'; 
import authController from './controllers/authControllers.js'; 
const port = process.env.PORT || 4000;



const app = express();
const corsOptions = {
    origin: '192.168.5.0', 
    optionsSuccessStatus: 204 
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', authController);  // Cambiado a /api/authnp
app.use(express.json());
app.use('/api', userController); // Usando el controlador de usuarios

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
