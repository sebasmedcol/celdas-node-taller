import express from 'express';
import 'dotenv/config.js';
import dotenv from 'dotenv'; // Importar dotenv para las variables de entorno
import dbConnection from '../database/config.js'; // Conexión a la base de datos
import celdaRouter from '../routers/celdaRouter.js'; // Rutas de celdas

// Configurar dotenv para leer el archivo .env

export default class Server {
    constructor() {
        this.app = express();
        this.middlewares(); // Agregar middlewares
        this.listen();
        this.dbConnect();
        this.pathCelda = '/api/celdas'; // Definir el path para las rutas de celdas
        this.routes();

    }

    middlewares() {
        // Middleware para manejar JSON
        this.app.use(express.json());
        // Middleware para manejar datos URL-encoded
        this.app.use(express.urlencoded({ extended: true }));
        // Puedes agregar más middlewares aquí si es necesario
    }

    listen() {
        // Levantar el servidor en el puerto definido
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }

    }
    listen() {
        // Levantar el servidor en el puerto definido
        this.app.listen(process.env.PORT,() => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }

    async dbConnect() {
        await dbConnection();
    }

    routes() {
        // Definir las rutas
        this.app.use(this.pathCelda, celdaRouter);
    }
}
