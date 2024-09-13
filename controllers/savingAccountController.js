import SavingAccount from "../models/savingAccount.js";
import bcrypt from 'bcryptjs'

export async function getAcounts(req, res) {
    try {
        const cuentas = await SavingAccount.find()
        res.json(cuentas)
    } catch (error) {
        res.status(500).json('No hay cuentas creadas en la base de datos')
    }
}
export async function listAccount(req, res) {
    try {
        const account = await SavingAccount.findById(req.params.id);
        res.json(account)
    } catch (error) {
        res.status(500).json('Error al mostrar la información de la cuenta')
    }
}

export async function createAccount(req, res) {
    const body = req.body
    try {
        const account = new SavingAccount(body);
        account.accessKey = await bcrypt.hash(body.accessKey, 10)
        await account.save();
        res.status(201).json('Cuenta creada exitósamente')
    } catch (error) {
        res.status(500).json('Error al crear una cuenta')
    }
}

export async function consignMoney(req, res) {
    const { numberAccount } = req.params;
    const { amount, accessKey } = req.body;

    try {
        const account = await SavingAccount.findOne({ numberAccount });
        if (!account) {
            return res.status(404).json('Cuenta no encontrada');
        }

        const isValidAccessKey = await bcrypt.compare(accessKey, account.accessKey);
        if (!isValidAccessKey) {
            return res.status(401).json('Clave de acceso incorrecta');
        }

        if (amount <= 0) {
            return res.status(400).json('El monto a consignar debe ser positivo');
        }

        account.balance += amount;
        await account.save();
        res.status(200).json('Dinero consignado con éxito');
    } catch (error) {
        res.status(500).json('Error al consignar dinero en la cuenta');
    }
}

export async function removeMoney(req, res) {
    const { numberAccount } = req.params;
    const { amount, accessKey } = req.body;

    try {
        const account = await SavingAccount.findOne({ numberAccount });
        if (!account) {
            return res.status(404).json('Cuenta no encontrada');
        }

        const isValidAccessKey = await bcrypt.compare(accessKey, account.accessKey);
        if (!isValidAccessKey) {
            return res.status(401).json('Clave de acceso incorrecta');
        }

        if (amount <= 0) {
            return res.status(400).json('El monto a retirar debe ser positivo');
        }

        if (amount > account.balance) {
            return res.status(400).json('Saldo insuficiente');
        }

        account.balance -= amount;
        await account.save();
        res.status(200).json('Dinero retirado con éxito');
    } catch (error) {
        res.status(500).json('Error al retirar dinero de la cuenta');
    }
}

export async function deleteAccount(req, res) {
    try {
        const account = await SavingAccount.findById(req.params.id);
        if (!account) {
            return res.status(404).json('Cuenta no encontrada');
        }
        if (account.balance !== 0) {
            return res.status(400).json('No se puede eliminar una cuenta con saldo mayor a cero');
        }
   
        await SavingAccount.findByIdAndDelete(req.params.id);
        res.status(200).json('Cuenta eliminada satisfactoriamente');
    } catch (error) {
        res.status(500).json('Error al eliminar la cuenta');
    }
}
