import User from "../models/user.js"
import bcrypt from 'bcryptjs'

export async function getUser(req, res) {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json('Error al encontrar los usuarios')
    }
}

export async function registerUser(req, res) {
    const body = req.body
    try {
        const user = new User(body)
        user.password = await bcrypt.hash(body.password, 10)
        await user.save()
        res.status(201).json('Usuario creado exitósamente')
    } catch (error) {
        res.status(500).json('Error al crear un usuario')
    }
}

export async function updateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true
            })
        if (!user) {
            return res.status(404).json('Usuario no encontrado')
        } else {
            res.status(201).json('Información actualizada exitósamente')
        }
    } catch (error) {
        res.status(500).json('La información no pudo ser actualizada')
    }
}

export async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json('Usuario no encontrado')
        } else {
            res.status(201).json('Usuario eliminado satisfactoriamente')
        }
    } catch (error) {
        res.status(500).json('Usuario no eliminado')
    }
}

export async function login(req, res) {
    const { username, password } = req.body;

    try {
        // Encuentra el usuario por nombre de usuario
        const user = await User.findOne({ username });

        // Verifica si el usuario existe y está activo
        if (!user || user.status !== 'activo') {
            return res.status(401).json('Usuario inactivo o no encontrado');
        }

        // Compara la contraseña proporcionada con la almacenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json('Contraseña incorrecta');
        }

        // Si todo es correcto, responde con éxito
        res.status(200).json('Inicio de sesión exitoso');
        
    } catch (error) {
        // Maneja cualquier error inesperado
        console.error(error);
        res.status(500).json('Error interno del servidor');
    }
}
