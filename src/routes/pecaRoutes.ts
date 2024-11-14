import { Router, Request, Response, NextFunction } from 'express';
import { Peca } from '../models/Peca';
import express from 'express';
import { param, body, validationResult } from 'express-validator';
import { v7 as uuidv7 } from 'uuid';

export const pecaRoutes = express.Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
    (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error); 
};

const uuidValidationRule = [
    param('id').isUUID().withMessage('O ID deve ser um UUID válido.'),
];

const pecaValidationRules = [
    body('nome').isString().withMessage('O nome deve ser uma string.'),
    body('descricao').isString().withMessage('A descrição deve ser uma string.'),
    body('preco').isFloat({ gt: 0 }).withMessage('O preço deve ser um número maior que zero.'),
];

pecaRoutes.get('/pecas', asyncHandler(async (_req: Request, res: Response) => {
    try {
        const pecas = await Peca.findAll();
        if (pecas.length === 0) {
            return res.status(204).send(); 
        }
        res.json(pecas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar peças: ' + getErrorMessage(error) });
    }
}));

pecaRoutes.post('/pecas', pecaValidationRules, asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const novaPeca = await Peca.create({
            ...req.body,
            id: uuidv7()
        });
        res.status(201).json(novaPeca);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar peça: ' + getErrorMessage(error) });
    }
}));

pecaRoutes.patch('/pecas/:id', uuidValidationRule, asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const peca = await Peca.findOne({ where: { id } });
    
    if (!peca) {
        return res.status(404).json({ error: 'Peça não encontrada com o ID fornecido.' });
    }

    try {
        await peca.update(req.body);
        res.json(peca);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar peça (PATCH): ' + getErrorMessage(error) });
    }
}));

pecaRoutes.put('/pecas/:id', uuidValidationRule.concat(pecaValidationRules), asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const peca = await Peca.findOne({ where: { id } });

    if (!peca) {
        return res.status(404).json({ error: 'Peça não encontrada com o ID fornecido.' });
    }

    try {
        await peca.update(req.body);
        res.json(peca);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar peça (PUT): ' + getErrorMessage(error) });
    }
}));

pecaRoutes.delete('/pecas/:id', uuidValidationRule, asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const peca = await Peca.findOne({ where: { id } });
    
    if (!peca) {
        return res.status(404).json({ error: 'Peça não encontrada com o ID fornecido.' });
    }

    try {
        await peca.destroy();
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar peça: ' + getErrorMessage(error) });
    }
}));

pecaRoutes.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    
    if (res.headersSent) {
        return next(err);
    }
    
    res.status(500).json({ error: 'Erro interno do servidor.' });
});
