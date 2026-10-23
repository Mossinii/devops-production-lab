# Laboratório de contêineres: Node.js + PostgreSQL

> Projeto pessoal de estudo em infraestrutura. É um protótipo de demonstração, não um serviço de produção.

## Objetivo

Executar uma aplicação web simples em Node.js/Express conectada a um banco PostgreSQL, usando Compose. A rota `/` consulta o banco e exibe o horário retornado pelo PostgreSQL.

## Componentes definidos neste repositório

- **Aplicação:** Node.js 18 Alpine, Express e `pg`.
- **Banco:** PostgreSQL 15 Alpine.
- **Persistência:** volume nomeado `pgdata`.
- **Rede:** comunicação entre os serviços `web` e `db` pela rede padrão do Compose.
- **Orquestração:** arquivo `docker-compose.yml`, utilizável com Docker Compose; o uso com Podman depende do provider local e não é validado por este repositório.

Este repositório não contém pipeline de CI/CD, provisionamento de infraestrutura como código, balanceamento, TLS ou controles de produção.

## Executar localmente

Pré-requisitos: Docker Engine com Docker Compose v2, ou uma instalação compatível de Podman Compose.

1. Crie a configuração local a partir do exemplo:

   ```bash
   cp .env.example .env
   ```

2. Edite `.env` e defina `POSTGRES_PASSWORD` com uma senha local forte e aleatória. Não use credenciais reais de outros serviços e não compartilhe nem versione o arquivo `.env`.
3. Inicie os serviços:

   ```bash
   docker compose up --build
   ```

4. Abra `http://localhost:3000`. A aplicação informa se conseguiu consultar o banco.
5. Encerre os contêineres com `docker compose down`.

`docker compose down -v` também remove o volume `pgdata` e apaga os dados locais do laboratório. Use esse comando apenas quando quiser descartar esses dados.

## Segurança e limites

- O segredo do banco é lido de uma variável no `.env`, que é ignorado pelo Git e excluído do contexto de build. O arquivo `.env.example` contém apenas um campo vazio.
- A porta `3000` é publicada pelo Compose. Em uma máquina acessível por outras pessoas, restrinja o acesso na rede/firewall ou adapte a publicação para uso somente local.
- Use apenas dados fictícios/de teste. Não exponha esta aplicação nem o banco como serviço público.
- O laboratório não implementa autenticação de usuários, TLS, backup, monitoramento, CI/CD ou hardening de produção.

## Estrutura

- `app.js` — rota de demonstração e consulta ao PostgreSQL.
- `Dockerfile` — imagem da aplicação.
- `docker-compose.yml` — aplicação, banco e volume persistente.
- `.env.example` — modelo local sem credenciais.
