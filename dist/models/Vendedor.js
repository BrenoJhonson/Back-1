"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendedor = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Vendedor extends sequelize_1.Model {
}
exports.Vendedor = Vendedor;
Vendedor.init({
    id_vendedor: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome_vendedor: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    email_vendedor: { type: sequelize_1.DataTypes.STRING(255), unique: true, allowNull: false },
    telefone: sequelize_1.DataTypes.STRING(20),
    data_contratacao: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, { sequelize: connection_1.sequelize, tableName: 'vendedores', timestamps: false });
