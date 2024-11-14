import { Router, Request, Response, NextFunction } from 'express';
import { Cliente } from '../models/Cliente';
import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { v7 as uuidv7 } from 'uuid';

export const clienteRoutes = express.Router();

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

const clienteValidationRules = [
    body('nome_cliente').isString().withMessage('O nome deve ser uma string.'),
    body('email_cliente').isEmail().withMessage('O email deve ser válido.'),
    body('telefone_cliente').isString().withMessage('O telefone deve ser uma string.'),
];

const uuidValidationRule = [
    param('id').isUUID().withMessage('O ID deve ser um UUID válido.'),
];

clienteRoutes.get('/clientes', asyncHandler(async (_req: Request, res: Response) => {
    try {
        const clientes = await Cliente.findAll();
        if (clientes.length === 0) {
            return res.status(204).send();
        }
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar clientes: ' + getErrorMessage(error) });
    }
}));

clienteRoutes.post('/clientes', clienteValidationRules, asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const novoCliente = await Cliente.create({
            ...req.body,
            id: uuidv7()
        });
        res.status(201).json(novoCliente);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar cliente: ' + getErrorMessage(error) });
    }
}));

clienteRoutes.put('/clientes/:id', uuidValidationRule.concat(clienteValidationRules), asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const cliente = await Cliente.findOne({ where: { id } });

    if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado com o ID fornecido.' });
    }

    try {
        await cliente.update(req.body);
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar cliente: ' + getErrorMessage(error) });
    }
}));

clienteRoutes.delete('/clientes/:id', uuidValidationRule, asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const cliente = await Cliente.findOne({ where: { id } });
    
    if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado com o ID fornecido.' });
    }

    try {
        await cliente.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar cliente: ' + getErrorMessage(error) });
    }
}));

clienteRoutes.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    
    if (res.headersSent) {
        return next(err); 
    }
    
    res.status(500).json({ error: 'Erro interno do servidor.' });
});
