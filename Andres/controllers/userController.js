import express from "express";
import { check, validationResult } from 'express-validator';
import userService from "../services/userService.js"; // Cambiado a userServices
import User from "../models/userModel.js"; // Cambiado a userModel

const router = express.Router();

// Obtener todos los usuarios
router.get("/users", async (req, res) => {
    try {
        const users = await userService.getAllUsers(); // Cambiado a getAllUsers
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Obtener un usuario por ID
router.get("/users/:id", async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id); // Cambiado a getUserById
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Agregar un nuevo usuario
router.post("/users",
    [
        check('nombre').not().isEmpty().withMessage('El nombre es requerido'),
        check('correo_electronico').isEmail().withMessage('El correo electrónico es inválido').not().isEmpty().withMessage('El correo electrónico es requerido')
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Cambiado a errors.array()
        }

        try {
            const { nombre, correo_electronico, carrera } = req.body; // Cambiado a los campos del usuario
            const newUser = new User(null, nombre, correo_electronico, carrera); // Cambiado a User
            const addedUser = await userService.addUser(newUser); // Cambiado a addUser

            res.status(201).json(addedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Actualizar un usuario
router.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body); // Cambiado a updateUser
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar un usuario
router.delete('/users/:id', async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.id); // Cambiado a deleteUser
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;
