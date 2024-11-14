"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Vendedor_1 = require("../models/Vendedor");
const router = (0, express_1.Router)();
// Listar todos os vendedores
router.get('/vendedores', async (_req, res) => {
    try {
        const vendedores = await Vendedor_1.Vendedor.findAll();
        res.json(vendedores);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao listar vendedores' });
    }
});
// Criar um novo vendedor
router.post('/vendedores', async (req, res) => {
    try {
        const novoVendedor = await Vendedor_1.Vendedor.create(req.body);
        res.status(201).json(novoVendedor);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar vendedor' });
    }
});
// Atualizar um vendedor pelo ID
router.put('/vendedores/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const vendedor = await Vendedor_1.Vendedor.findByPk(id);
        if (vendedor) {
            await vendedor.update(req.body);
            res.json(vendedor);
        }
        else {
            res.status(404).json({ error: 'Vendedor não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar vendedor' });
    }
});
// Deletar um vendedor pelo ID
router.delete('/vendedores/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const vendedor = await Vendedor_1.Vendedor.findByPk(id);
        if (vendedor) {
            await vendedor.destroy();
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Vendedor não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar vendedor' });
    }
});
exports.default = router;
