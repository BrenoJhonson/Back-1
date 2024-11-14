"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Peca_1 = require("../models/Peca");
const router = (0, express_1.Router)();
// Listar todas as peças
router.get('/pecas', async (_req, res) => {
    try {
        const pecas = await Peca_1.Peca.findAll();
        res.json(pecas);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao listar peças' });
    }
});
// Criar uma nova peça
router.post('/pecas', async (req, res) => {
    try {
        const novaPeca = await Peca_1.Peca.create(req.body);
        res.status(201).json(novaPeca);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar peça' });
    }
});
// Atualizar uma peça pelo ID
router.put('/pecas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const peca = await Peca_1.Peca.findByPk(id);
        if (peca) {
            await peca.update(req.body);
            res.json(peca);
        }
        else {
            res.status(404).json({ error: 'Peça não encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar peça' });
    }
});
// Deletar uma peça pelo ID
router.delete('/pecas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const peca = await Peca_1.Peca.findByPk(id);
        if (peca) {
            await peca.destroy();
            res.status(204).send();
        }
        else {
            res.status(404).json({ error: 'Peça não encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar peça' });
    }
});
exports.default = router;
