"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Cliente extends sequelize_1.Model {
}
exports.Cliente = Cliente;
Cliente.init({
    id_cliente: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome_cliente: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    email_cliente: { type: sequelize_1.DataTypes.STRING(255), unique: true, allowNull: false },
    telefone_cliente: sequelize_1.DataTypes.STRING(20),
    endereco_cliente: sequelize_1.DataTypes.STRING(255),
    cidade: sequelize_1.DataTypes.STRING(100),
    estado: sequelize_1.DataTypes.STRING(100),
    cep: sequelize_1.DataTypes.STRING(10),
    data_cadastro: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, { sequelize: connection_1.sequelize, tableName: 'clientes', timestamps: false });
