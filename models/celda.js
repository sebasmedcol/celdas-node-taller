import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const CeldaSchema = new Schema({
    numeroCelda: {
        type: Number,
        required: true,
        unique: true
    },
    estado: {
        type: String,
        enum: ['disponible', 'no disponible'],
        default: 'disponible',
    },
    placaVehiculo: {
        type: String,
        maxlength: 6,
    },
    fechaIngreso: {
        type: Date,
    },
    fechaSalida: {
        type: Date,
    },
    pin: {
        type: String,
    },
});

// Definir el modelo 'Celda' basado en el esquema 'CeldaSchema'
export default model('Celda', CeldaSchema);
