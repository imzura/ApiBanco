import { Router } from "express";
import { removeMoney, consignMoney, createAccount, listAccount, deleteAccount, getAcounts} from '../controllers/savingAccountController.js';

const routesAccount = Router();

routesAccount.get('/', getAcounts)
routesAccount.post('/', createAccount)
routesAccount.get('/:id', listAccount)
routesAccount.post('/consignar/:numberAccount', consignMoney)
routesAccount.post('/retirar/:numberAccount', removeMoney)
routesAccount.delete('/:id', deleteAccount)

export default routesAccount