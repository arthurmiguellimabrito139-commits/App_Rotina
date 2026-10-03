# App Rotina — O que vestir hoje?

Aplicação que consulta a previsão do tempo da sua localização e recomenda o que vestir em cada período do dia, usando as peças cadastradas no seu guarda-roupa.

## Tecnologias

- **API:** Node.js, Express 5, Sequelize + MySQL
- **Frontend:** React 19, Vite, styled-components
- **Clima:** [Open-Meteo](https://open-meteo.com/) (gratuita, sem chave de API)

## O que já está pronto

### Clima
- Busca a previsão das próximas 24 horas pela latitude/longitude: temperatura, sensação térmica, chance de chuva, vento e índice UV.
- Agrupa a previsão por período (Madrugada, Manhã, Tarde e Noite) com sensação mínima/máxima e o pior caso de chuva, vento e UV.
- Gera recomendações em texto, como "blusa de frio", "guarda-chuva" ou "protetor solar".
- Valida as coordenadas: recusa valores vazios ou fora do intervalo.

### Guarda-roupa
- CRUD de peças salvas no MySQL. Cada peça tem nome, tipo e as marcações `quente`, `impermeavel`, `protegeVento` e `limpo`.
- Sugestão de peças por período: usa só as peças limpas e escolhe de acordo com a sensação térmica, a chuva e o vento previstos.

### Frontend
- Aba **Clima**: pede a localização do navegador e mostra um card por período, com temperaturas e roupas recomendadas.
- Aba **Guarda-roupa**: formulário para cadastrar peças e uma lista com opção de remover.

## Rotas da API

Base: `http://localhost:3001/api`

| Método | Rota | Descrição |
|---|---|---|
| GET | `/clima?lat=&lon=` | Previsão e recomendações por período |
| GET | `/guarda-roupa/pecas` | Lista as peças |
| POST | `/guarda-roupa/pecas` | Cadastra uma peça |
| PUT | `/guarda-roupa/pecas/:id` | Atualiza uma peça |
| DELETE | `/guarda-roupa/pecas/:id` | Remove uma peça |
| GET | `/guarda-roupa/sugestoes?lat=&lon=` | Sugere peças do guarda-roupa por período |

Os erros voltam no formato `{ "erro": "mensagem" }`.

## Como rodar

Pré-requisitos: Node.js 20.6 ou mais recente e um MySQL rodando.

### API

```bash
cd api
cp .env.example .env   # preencha os dados do banco
npm install
npm run dev
```

Crie antes o banco definido em `DB_NAME`. As tabelas são criadas automaticamente quando a API sobe. Para testar só a conexão com o banco: `node --env-file=.env teste.js`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Depois abra o endereço que o Vite mostrar no terminal e permita o acesso à localização.

## Estrutura

```
api/src/
  app.js, server.js
  config/database.js
  modules/
    Clima/          # previsão, recomendações e validação de coordenadas
    guardaRoupa/    # peças e sugestões
frontend/src/
  components/       # PeriodoCard, GuardaRoupa, FormularioPeca, ListaPecas
  hooks/            # useClima, usePecas
```

## Próximos passos

- Mostrar no frontend as sugestões do guarda-roupa (a rota `/sugestoes` já existe)
- Upload de foto das peças (`multer` já instalado, campo `caminhoImagem` no modelo)
- Editar e marcar peças como sujas/limpas pela interface
