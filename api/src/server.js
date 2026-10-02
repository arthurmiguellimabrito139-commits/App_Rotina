import app from "./app.js";
import { sequelize } from "./config/database.js";
import { Peca } from "./modules/guardaRoupa/models/peca.model.js";

const PORT = 3001;

await sequelize.sync();

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Erro ao iniciar o servidor na porta ${PORT}:`, error.message);
    process.exit(1);
  }
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});