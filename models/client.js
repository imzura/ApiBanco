import { model, Schema } from "mongoose";

const ClientSchema = new Schema({
    document: {
        type: Number,
        unique: true,
        required: [true, 'El documento es requerido']
    },
    nameComplete: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    phone: {
        type: Number,
        unique: true,
        maxLength: [10, 'Máximo 10 números']
    },
    dateBirth: {
        type: Date
    }
})

export default model('Client', ClientSchema, 'client')