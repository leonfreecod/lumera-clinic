# Luméra Estética Avançada

MVP visual de uma clínica de estética premium com site público, agendamento online e painel administrativo demonstrativo.

## Funcionalidades

- Landing page responsiva e comercial.
- Catálogo de procedimentos.
- Equipe de especialistas.
- Agendamento em quatro etapas.
- Bloqueio de horários ocupados.
- Confirmação com código.
- Cancelamento por código e telefone.
- Painel administrativo com métricas.
- Busca, filtro e atualização de status.
- Persistência local com `localStorage`.

## Stack

- React
- Vite
- React Router
- CSS responsivo

## Executar localmente

```bash
npm install
```

Instala as dependências do projeto.

```bash
npm run dev
```

Inicia o servidor de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção na pasta `dist`.

```bash
npm run preview
```

Executa localmente o build de produção.

## Rotas

- `/` — site público.
- `/agendar` — fluxo de agendamento.
- `/admin` — painel administrativo demonstrativo.

## Observações

Este projeto é fictício. Profissionais, depoimentos, preços e informações são demonstrativos.

Os agendamentos ficam salvos somente no navegador atual. A evolução planejada é uma API em Java/Spring Boot com PostgreSQL, autenticação administrativa e regras reais de disponibilidade.

As fotografias são carregadas do Unsplash e precisam de conexão com a internet.
