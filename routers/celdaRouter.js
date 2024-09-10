import { Router } from 'express';
import { getCelda, postCelda, putCelda, deleteCelda, getCeldasDisponibles, calcularPago } from '../controllers/celdaController.js';

const celdaRouter = Router();

celdaRouter.get('/', getCelda); // Obtener todas las celdas
celdaRouter.get('/:id', getCelda); // Obtener una celda específica por id
celdaRouter.get('/estado/disponible', getCeldasDisponibles); // Obtener todas las celdas disponibles
celdaRouter.post('/', postCelda); // Crear una nueva celda
celdaRouter.put('/:id', putCelda); // Actualizar una celda específica
celdaRouter.delete('/:id', deleteCelda); // Eliminar una celda específica
celdaRouter.post('/calcular-pago/:id', calcularPago); // Calcular el pago basado en la celda

export default celdaRouter;
