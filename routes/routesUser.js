import { Router } from "express";
import { deleteUser, getUser, registerUser, updateUser, login } from '../controllers/userController.js';

const routesUser = Router();

routesUser.get('/', getUser)
routesUser.post('/', registerUser)
routesUser.put('/:id', updateUser)
routesUser.delete('/:id', deleteUser)
routesUser.post('/login', login)

export default routesUser