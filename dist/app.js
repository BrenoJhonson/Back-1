"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configuração da conexão com o banco de dados PostgreSQL
const sequelize = new sequelize_1.Sequelize('loja_pecas_motos', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
});
// Teste de conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
})
    .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err);
});
// Definição dos modelos
class Peca extends sequelize_1.Model {
}
Peca.init({
    id_peca: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome_peca: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    categoria: sequelize_1.DataTypes.STRING(100),
    marca: sequelize_1.DataTypes.STRING(100),
    modelo_moto: sequelize_1.DataTypes.STRING(100),
    preco: sequelize_1.DataTypes.DECIMAL(10, 2),
    estoque: sequelize_1.DataTypes.INTEGER,
    data_adicao: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'pecas',
    timestamps: false,
});
class Cliente extends sequelize_1.Model {
}
Cliente.init({
    id_cliente: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome_cliente: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    email_cliente: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    telefone_cliente: sequelize_1.DataTypes.STRING(20),
    endereco_cliente: sequelize_1.DataTypes.STRING(255),
    cidade: sequelize_1.DataTypes.STRING(100),
    estado: sequelize_1.DataTypes.STRING(100),
    cep: sequelize_1.DataTypes.STRING(10),
    data_cadastro: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'clientes',
    timestamps: false,
});
class Vendedor extends sequelize_1.Model {
}
Vendedor.init({
    id_vendedor: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome_vendedor: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    email_vendedor: {
        type: sequelize_1.DataTypes.STRING(255),
        unique: true,
        allowNull: false,
    },
    telefone: sequelize_1.DataTypes.STRING(20),
    data_contratacao: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'vendedores',
    timestamps: false,
});
app.get('/pecas', async (_req, res) => {
    try {
        const pecas = await Peca.findAll();
        res.json(pecas);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao listar peças' });
    }
});
app.get('/clientes', async (_req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao listar clientes' });
    }
});
app.get('/vendedores', async (_req, res) => {
    try {
        const vendedores = await Vendedor.findAll();
        res.json(vendedores);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao listar vendedores' });
    }
});
app.listen(3003, () => console.log('Servidor rodando na porta 3003'));
