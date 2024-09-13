import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'El usuario el requerido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    status: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    }
})

export default model('User', UserSchema, 'user')