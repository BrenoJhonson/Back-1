"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peca = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
class Peca extends sequelize_1.Model {
}
exports.Peca = Peca;
Peca.init({
    id_peca: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome_peca: { type: sequelize_1.DataTypes.STRING(50), allowNull: false },
    categoria: sequelize_1.DataTypes.STRING(100),
    marca: sequelize_1.DataTypes.STRING(100),
    modelo_moto: sequelize_1.DataTypes.STRING(100),
    preco: sequelize_1.DataTypes.DECIMAL(10, 2),
    estoque: sequelize_1.DataTypes.INTEGER,
    data_adicao: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, { sequelize: connection_1.sequelize, tableName: 'pecas', timestamps: false });
