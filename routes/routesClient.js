import { Router } from "express";
import { getClient, registerClient, updateClient, deleteClient } from '../controllers/clientController.js';

const routesClient = Router();

routesClient.get('/', getClient)
routesClient.post('/', registerClient)
routesClient.put('/:id', updateClient)
routesClient.delete('/:id', deleteClient)

export default routesClient