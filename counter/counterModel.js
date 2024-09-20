import { Schema, model } from 'mongoose';

const CounterSchema = new Schema({
    _id: String,
    sequence_value: Number
});

export default model('Counter', CounterSchema);
