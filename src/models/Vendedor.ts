import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../END/connection';
import { v7 as uuidv7 } from 'uuid'; 

export class Vendedor extends Model {
    public id_vendedor!: string; 
    public nome_vendedor!: string;
    public email_vendedor!: string;
    public telefone?: string;
    public data_contratacao?: Date;
}

Vendedor.init({
    id_vendedor: {
        type: DataTypes.UUID,    
        primaryKey: true,
        defaultValue: uuidv7 
    },
    nome_vendedor: { type: DataTypes.STRING(255), allowNull: false },
    email_vendedor: { type: DataTypes.STRING(255), unique: true, allowNull: false },
    telefone: DataTypes.STRING(20),
    data_contratacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, tableName: 'vendedores', timestamps: false });
