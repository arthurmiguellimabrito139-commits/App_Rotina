import { buscarClima } from "../services/openMeteo.service.js";

export async function obterClima(req, res) {

    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);

    try {
        const dados = await buscarClima(lat, lon);
        res.json(dados);
    }catch (error) {
        res.status(500).json({error: 'Erro ao buscar o clima'});
    }

}