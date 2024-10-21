import express from 'express';
import userController from './controllers/userController.js'; // Cambiado a userController
import morgan from 'morgan'; // Middleware para registro de solicitudes HTTP
import bodyParser from 'body-parser'; // Middleware para analizar cuerpos de las solicitudes
const app = express();
// Middleware de registro de solicitudes
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api', userController); // Usando el controlador de usuarios

const PORT = 3001;
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto ${PORT}");
});
