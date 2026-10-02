import express from 'express';
import cors from 'cors';
import climaRoutes from './modules/Clima/routes/clima.routes.js';
import guardaRoupaRoutes from './modules/guardaRoupa/routes/guardaRoupa.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clima', climaRoutes);
app.use("/api/guarda-roupa", guardaRoupaRoutes);

export default app;