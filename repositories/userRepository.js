import fs from 'fs-extra'
import User from '../models/userModel.js'  // Asegúrate de que el modelo esté en la ruta correcta

const filePath = './user.json'  // Ruta donde se almacenarán los usuarios

// Función para obtener la lista de usuarios desde el archivo JSON
async function getUsers() {
    try {
        const data = await fs.readJson(filePath)
        return data.map(user => new User(
            user.id,
            user.nombre,
            user.correo_electronico,
            user.telefono,
            user.direccion,
            user.ciudad,
            user.pais,
            user.fecha_registro,
            user.estado
        ))
    } catch (error) {
        console.error(error)
    }
}

// Función para guardar la lista de usuarios en el archivo JSON
async function saveUsers(users) {
    try {
        await fs.writeJson(filePath, users)
    } catch (error) {
        console.error(error)
    }
}

export default {
    getUsers,
    saveUsers
}
