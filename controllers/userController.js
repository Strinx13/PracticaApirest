import express from "express";
import { check, validationResult } from 'express-validator';
import userService from "../services/userService.js"; // Cambiado a userServices
import User from "../models/userModel.js"; // Cambiado a userModel

const router = express.Router();


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna una lista de todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Una lista de usuarios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Juan Perez"
 */

// Obtener todos los usuarios
router.get("/users", async (req, res) => {
    try {
        const users = await userService.getAllUsers(); // Cambiado a getAllUsers
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Ana García"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Ana García"
 *       400:
 *         description: Error en la solicitud
 */

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

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Carlos Torres"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Carlos Torres"
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Usuario no encontrado
 */


// Actualizar un usuario
router.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body); // Cambiado a updateUser
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario existente por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente.
 *       404:
 *         description: Usuario no encontrado
 */


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
