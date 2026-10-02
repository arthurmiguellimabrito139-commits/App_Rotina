import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/database.js";

export const Peca = sequelize.define("peca", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quente: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    impermeavel: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    protegeVento: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    limpo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    caminhoImagem: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});
