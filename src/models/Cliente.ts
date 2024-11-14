import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../END/connection';
import { v7 as uuidv7 } from 'uuid';  

export class Cliente extends Model {
    public id_cliente!: string;
    public nome_cliente!: string;
    public email_cliente!: string;
    public telefone_cliente?: string;
    public endereco_cliente?: string;
    public cidade?: string;
    public estado?: string;
    public cep?: string;
    public data_cadastro?: Date;
}

Cliente.init({
    id_cliente: {
        type: DataTypes.UUID,    
        primaryKey: true,
        defaultValue: uuidv7   
    },
    nome_cliente: { type: DataTypes.STRING(255), allowNull: false },
    email_cliente: { type: DataTypes.STRING(255), unique: true, allowNull: false },
    telefone_cliente: DataTypes.STRING(20),
    endereco_cliente: DataTypes.STRING(255),
    cidade: DataTypes.STRING(100),
    estado: DataTypes.STRING(100),
    cep: DataTypes.STRING(10),
    data_cadastro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { sequelize, tableName: 'clientes', timestamps: false });
