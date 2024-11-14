"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cliente_1 = require("../models/Cliente");
const router = (0, express_1.Router)();
// Listar todos os clientes
router.get('/clientes', async (_req, res) => {
    try {
        const clientes = await Cliente_1.Cliente.findAll();
        res.json(clientes);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao listar clientes' });
    }
});
// Criar um novo cliente
router.post('/clientes', async (req, res) => {
    try {
        const novoCliente = await Cliente_1.Cliente.create(req.body);
        res.status(201).json(novoCliente);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar cliente' });
    }
});
// Atualizar um cliente pelo ID
router.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente_1.Cliente.findByPk(id);
        if (cliente) {
            await cliente.update(req.body);
            res.json(cliente);
        }
        else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
});
// Deletar um cliente pelo ID
router.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente_1.Cliente.findByPk(id);
        if (cliente) {
            await cliente.destroy();
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Cliente não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
});
exports.default = router;
