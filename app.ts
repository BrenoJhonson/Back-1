import express from 'express';
import {clienteRoutes} from './src/routes/clienteRoutes';
import {vendedorRoutes} from "./src/routes/vendedorRoutes";
import {pecaRoutes} from "./src/routes/pecaRoutes"

const app = express();
app.use(express.json());

app.use(pecaRoutes);
app.use(clienteRoutes);
app.use(vendedorRoutes);

app.listen(3003, () => console.log('Servidor rodando na porta 3003'));
