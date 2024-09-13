import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'

let numeroCuentaAutoIncrement = 1;

const SavingAccountSchema = new Schema({
    numberAccount: {
        type: Number,
        unique: true,
        required: true,
        default: () => numeroCuentaAutoIncrement++ 
    },
    clientDocument: { 
        type: String, 
        unique: true,
        required: true 
    },
    openingDate: { 
        type: Date, 
        default: Date.now 
    },
    balance: { 
        type: Number, 
        default: 0 
    },
    accessKey: { 
        type: String, 
        required: true,
    }
});

export default model('SavingAccount', SavingAccountSchema, 'savingAccount');
