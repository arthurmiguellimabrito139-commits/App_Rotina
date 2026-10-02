import { sequelize } from "./src/config/database.js";

try {
  await sequelize.authenticate();
  console.log("Conexão com o banco deu certo!");
} catch (erro) {
  console.error("Erro ao conectar:", erro);
}