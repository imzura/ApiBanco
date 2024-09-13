import Client from "../models/client.js";

export async function getClient(req, res) {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json('No hay clientes en la base de datos')
    }

}

export async function registerClient(req, res) {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).json('Cliente registrado exitósamente')
    } catch (error) {
        res.status(500).json('Error al registrar cliente')
    }
}

export async function updateClient(req, res) {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, 
            {
                new: true
            })
            if (!client) {
                return res.status(404).json('Cliente no encontrado')
            } else {
                res.status(201).json('Información actualizada exitósamente')
            }
    } catch (error) {
        res.status(500).json('La información no pudo ser actualizada')
    }
}

export async function deleteClient(req, res) {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            res.status(404).json('Cliente no encontrado')
        } else {
            res.status(201).json('Cliente eliminado satisfactoriamente')
        }
    } catch (error) {
        res.status(500).json('Cliente no eliminado')
    }
}