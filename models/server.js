import express from 'express';
import 'dotenv/config' // permite trabajar con variables de entorno
import dbConnection from '../database/config.js';
import routesClient from '../routes/routesClient.js';
import routesUser from '../routes/routesUser.js';
import routesAccount from '../routes/routesSavingAccount.js';


export default class Server {
    constructor() {
        this.app = express()
        this.listen()
        this.dbConnection()
        this.pathClient = '/api/cliente'
        this.pathUser = '/api/usuario'
        this.pathAccount = '/api/cuenta'
        this.route()
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`El servidor esta corriendo en el puerto ${process.env.PORT}`)
        })
    }

    async dbConnection() {
        await dbConnection()
    }

    route() {
        this.app.use(express.json());

        // Routes
        this.app.use(this.pathClient, routesClient)
        this.app.use(this.pathUser, routesUser)
        this.app.use(this.pathAccount, routesAccount)
    }
}