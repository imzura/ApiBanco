import express from 'express';
import 'dotenv/config'; // Permite trabajar con variables de entorno
import cors from 'cors'; // Importa cors
import dbConnection from '../database/config.js';
import routesClient from '../routes/routesClient.js';
import routesUser from '../routes/routesUser.js';
import routesAccount from '../routes/routesSavingAccount.js';

export default class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.dbConnection();
        this.pathClient = '/api/cliente';
        this.pathUser = '/api/usuario';
        this.pathAccount = '/api/cuenta';
        
        // Configurar CORS antes de las rutas
        this.middlewares();
        this.route();
    }

    middlewares() {
        // Habilitar CORS
        this.app.use(cors());

        // Permitir que el servidor procese JSON
        this.app.use(express.json());
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`El servidor está corriendo en el puerto ${process.env.PORT}`);
        });
    }

    async dbConnection() {
        await dbConnection();
    }

    route() {
        // Rutas
        this.app.use(this.pathClient, routesClient);
        this.app.use(this.pathUser, routesUser);
        this.app.use(this.pathAccount, routesAccount);
    }
}
