import { Router, Request, Response, NextFunction } from 'express';
import { Vendedor } from '../models/Vendedor';
import express from 'express';
import { body, param, validationResult } from 'express-validator';

export const vendedorRoutes = express.Router();

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

const vendedorValidationRules = [
    body('nome').isString().withMessage('O nome deve ser uma string.'),
    body('email').isEmail().withMessage('O email deve ser válido.'),
    body('telefone').isString().optional().withMessage('O telefone deve ser uma string.'),
];

const uuidValidationRule = [
    param('id').isUUID().withMessage('O ID deve ser um UUID válido.'),
];

vendedorRoutes.get('/vendedores', asyncHandler(async (_req: Request, res: Response) => {
    const vendedores = await Vendedor.findAll();
    res.json(vendedores);
}));

vendedorRoutes.post('/vendedores', vendedorValidationRules, asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const novoVendedor = await Vendedor.create(req.body);
        res.status(201).json(novoVendedor);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar vendedor: ' + getErrorMessage(error) });
    }
}));

vendedorRoutes.patch('/vendedores/:id', uuidValidationRule, vendedorValidationRules, asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const vendedor = await Vendedor.findByPk(id);
    
    if (!vendedor) {
        return res.status(404).json({ error: 'Vendedor não encontrado com o ID fornecido.' });
    }

    try {
        await vendedor.update(req.body);
        res.json(vendedor);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar vendedor (PATCH): ' + getErrorMessage(error) });
    }
}));

vendedorRoutes.put('/vendedores/:id', uuidValidationRule, vendedorValidationRules, asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const vendedor = await Vendedor.findByPk(id);

    if (!vendedor) {
        return res.status(404).json({ error: 'Vendedor não encontrado com o ID fornecido.' });
    }

    try {
        await vendedor.update(req.body);
        res.json(vendedor);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar vendedor (PUT): ' + getErrorMessage(error) });
    }
}));

vendedorRoutes.delete('/vendedores/:id', uuidValidationRule, asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    const vendedor = await Vendedor.findByPk(id);
    
    if (!vendedor) {
        return res.status(404).json({ error: 'Vendedor não encontrado com o ID fornecido.' });
    }

    try {
        await vendedor.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar vendedor: ' + getErrorMessage(error) });
    }
}));

vendedorRoutes.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    
    res.status(500).json({ error: 'Erro interno do servidor.' });
});
