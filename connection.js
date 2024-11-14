"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('loja_pecas_motos', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
});
exports.sequelize.authenticate()
    .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));
