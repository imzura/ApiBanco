import { model, Schema } from "mongoose";
import { getNextSequenceValue } from "../counter/counterService.js";

const SavingAccountSchema = new Schema({
    clientDocument: { 
        type: Number,
        required: true 
    },
    numberAccount: {
        type: Number,
        unique: true
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
    }
});

// Pre-save hook para auto-incrementar numeroCuenta
SavingAccountSchema.pre('save', async function (next) {
    if (this.isNew) {
      this.numberAccount = await getNextSequenceValue('numberAccount');
    }
    next();
  });

export default model('SavingAccount', SavingAccountSchema, 'savingAccount');
