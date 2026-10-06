import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/database.js";

export const Usuario = sequelize.define("usuario", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});