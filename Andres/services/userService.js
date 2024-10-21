import userRepository from '../repositories/userRepository.js'

async function getAllUsers() {
    return await userRepository.getUsers()
}
async function getUserById(id) {
    const users = await userRepository.getUsers();
    const user = users.find(user => user.id === parseInt(id));

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    return user;
}
async function addUser(user) {
    // Validación básica: el usuario debe tener nombre y correo electrónico
    if (!user.nombre || !user.correo_electronico) {
        throw new Error("El usuario debe tener un nombre y un correo electrónico.");
    }

    const users = await userRepository.getUsers();

    // Generar un nuevo ID basado en el ID más alto en la lista actual de usuarios
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = { ...user, id: newId };

    // Agregar el nuevo usuario a la lista y guardarla
    users.push(newUser);
    await userRepository.saveUsers(users);

    return newUser;
}

async function updateUser(id, updatedUser) {
    const users = await userRepository.getUsers();
    const index = users.findIndex(user => user.id === parseInt(id));

    // Si no se encuentra el usuario, lanzar un error
    if (index === -1) {
        throw new Error('Usuario no encontrado');
    }

    // Eliminar el ID del objeto actualizado para que no se sobreescriba
    delete updatedUser.id;

    // Actualizar el usuario con los nuevos datos
    users[index] = { ...users[index], ...updatedUser };

    await userRepository.saveUsers(users);
    return users[index];
}

async function deleteUser(id) {
    const users = await userRepository.getUsers();
    const index = users.findIndex(user => user.id === parseInt(id));

    // Si no se encuentra el usuario, lanzar un error
    if (index === -1) {
        throw new Error('Usuario no encontrado');
    }

    // Filtrar la lista de usuarios para eliminar el seleccionado
    const filteredUsers = users.filter(user => user.id !== parseInt(id));
    await userRepository.saveUsers(filteredUsers);
    return { message: 'Usuario eliminado' };
}

export default {
    getAllUsers,
    getUserById, 
    addUser,
    updateUser,
    deleteUser
}
