import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../END/connection';
import { v7 as uuidv7 } from 'uuid';  

export class Peca extends Model {
    public id_peca!: string; 
    public nome_peca!: string;
    public categoria?: string;
    public marca?: string;
    public modelo_moto?: string;
    public preco?: number;
    public estoque?: number;
    public data_adicao?: Date;
}

Peca.init({
    id_peca: {
        type: DataTypes.UUID,        
        primaryKey: true,
        defaultValue: uuidv7 
    },
    nome_peca: { type: DataTypes.STRING(50), allowNull: false },
    categoria: DataTypes.STRING(100),
    marca: DataTypes.STRING(100),
    modelo_moto: DataTypes.STRING(100),
    preco: DataTypes.DECIMAL(10, 2),
    estoque: DataTypes.INTEGER,
    data_adicao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, tableName: 'pecas', timestamps: false });
