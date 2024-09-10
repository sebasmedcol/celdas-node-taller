import Celda from '../models/celda.js';

// Obtener todas las celdas
export async function getCelda(req, res) {
    try {
        const celdas = await Celda.find();
        res.json(celdas);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Obtener celdas disponibles
export async function getCeldasDisponibles(req, res) {
    try {
        const celdasDisponibles = await Celda.find({ estado: 'disponible' });
        res.json(celdasDisponibles);
    } catch (error) {
        res.status(500).json({ error });
    }
}

// Crear una nueva celda
export async function postCelda(req, res) {
    const { numeroCelda, estado } = req.body;
    try {
        const nuevaCelda = new Celda({ numeroCelda, estado });
        await nuevaCelda.save();
        res.status(201).json('Celda creada exitosamente');
    } catch (error) {
        res.status(500).json(error);
    }
}

// Actualizar una celda
export async function putCelda(req, res) {
    const { id } = req.params;
    const { estado, placaVehiculo, fechaIngreso, fechaSalida, pin } = req.body;
    try {
        const celdaActualizada = await Celda.findByIdAndUpdate(
            id,
            { estado, placaVehiculo, fechaIngreso, fechaSalida, pin },
            { new: true }
        );
        res.json(celdaActualizada);
    } catch (error) {
        res.status(500).json(error);
    }
}

// Eliminar una celda
export async function deleteCelda(req, res) {
    const { id } = req.params;
    try {
        await Celda.findByIdAndDelete(id);
        res.json('Celda eliminada exitosamente');
    } catch (error) {
        res.status(404).json('Celda no encontrada');
    }
}

// Calcular pago basado en el tiempo de parqueo
export async function calcularPago(req, res) {
    const { id } = req.params;
    try {
        const celda = await Celda.findById(id);
        if (!celda || !celda.fechaIngreso || !celda.fechaSalida) {
            return res.status(400).json('Datos insuficientes para calcular el pago');
        }

        const horasParqueo = Math.ceil((celda.fechaSalida - celda.fechaIngreso) / 3600000); // Calcular horas
        const pago = horasParqueo * 5000;
        res.json(`El total a pagar es: ${pago} COP`);
    } catch (error) {
        res.status(500).json({ error });
    }
}
