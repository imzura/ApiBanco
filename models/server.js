import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import dbConnection from '../database/config.js';
import routesClient from '../routes/routesClient.js';
import routesUser from '../routes/routesUser.js';
import routesAccount from '../routes/routesSavingAccount.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Server {
    constructor() {
        this.app = express();
        this.middlewares();
        this.route();
        this.dbConnection();
        this.listen();
    }

    middlewares() {
        // Configuración específica de CORS
        const corsOptions = {
            origin: 'http://localhost:5173', // Origen permitido
            optionsSuccessStatus: 200 // Para asegurar compatibilidad con algunos navegadores
        };
        this.app.use(cors(corsOptions)); // Aplicar CORS con las opciones configuradas
        this.app.use(express.json());
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`El servidor está corriendo en el puerto ${process.env.PORT}`);
        });
    }

    async dbConnection() {
        try {
            await dbConnection();
            console.log('Conexión a la base de datos exitosa');
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        }
    }

    route() {
        this.app.use(express.static('public'));
        this.app.get('/', (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
        });
        this.app.use('/api/cliente', routesClient);
        this.app.use('/api/usuario', routesUser);
        this.app.use('/api/cuenta', routesAccount);
    }
}
