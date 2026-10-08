# App Rotina — Clima & Guarda-roupa

Aplicação web que recomenda o que vestir ao longo do dia com base na previsão do tempo em tempo real, e permite gerenciar seu próprio guarda-roupa para receber sugestões de peças específicas.

## Sobre o projeto

O App Rotina nasceu como um projeto pessoal de estudo, com o objetivo de aplicar na prática conceitos de arquitetura MVC, APIs REST, autenticação e integração entre frontend e backend. A ideia central: usar a previsão do tempo das próximas horas para recomendar roupas adequadas a cada período do dia (madrugada, manhã, tarde e noite), cruzando essa recomendação com as peças que o próprio usuário cadastrou no seu guarda-roupa.

## Funcionalidades

- **Previsão do tempo por período do dia** — busca a previsão horária via geolocalização e agrupa os dados em Madrugada, Manhã, Tarde e Noite.
- **Recomendação de roupa automática** — com base em sensação térmica, chance de chuva, vento e índice UV de cada período.
- **Guarda-roupa pessoal** — cadastro de peças (nome, tipo, se é quente, impermeável, protege do vento, se está limpa), com sugestão de quais peças usar em cada período do dia.
- **Autenticação de usuários** — cadastro e login com senha criptografada (bcrypt) e sessão via JWT.
- **Guarda-roupa isolado por usuário** — cada conta só vê e gerencia suas próprias peças.

## Tecnologias

**Backend**
- Node.js + Express
- MySQL + Sequelize (ORM)
- JWT (jsonwebtoken) para autenticação
- bcrypt para hash de senhas
- Open-Meteo API para dados meteorológicos

**Frontend**
- React + Vite
- styled-components

## Arquitetura

O backend segue o padrão MVC organizado por módulo de funcionalidade, não por camada:

```
api/src/modules/
├── Clima/           # busca e processamento da previsão do tempo
├── guardaRoupa/     # CRUD de peças e geração de sugestões
└── auth/            # cadastro, login e autenticação
```

Cada módulo contém suas próprias rotas, controllers, models e services, o que facilita adicionar novas funcionalidades sem afetar as existentes.

## Como rodar localmente

### Pré-requisitos
- Node.js 18+
- MySQL

### Backend

```bash
cd api
npm install
cp .env.example .env
# preencha DB_NAME, DB_USER, DB_PASSWORD, DB_HOST e JWT_SECRET no .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação frontend sobe em `http://localhost:5173` e consome a API em `http://localhost:3001`.

## Roadmap

- [ ] Upload de imagem das peças do guarda-roupa (Cloudinary)
- [ ] Recuperação de senha por e-mail
- [ ] Categorização das peças por grupo (casacos, calças, calçados, etc.)
- [ ] Deploy em produção

## Autor

Desenvolvido por Arthur, como projeto pessoal de estudo e portfólio.
