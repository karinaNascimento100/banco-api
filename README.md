
# Banco API

Este projeto é uma API bancária com dois tipos de serviços: **REST** e **GraphQL**. Ele simula operações bancárias básicas, como consultar contas, realizar transferências e autenticar usuários. O serviço GraphQL usa Apollo Server e a API REST foi construída com Express.

## Estrutura do Projeto

O projeto é dividido nas seguintes pastas:

```
project/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração de banco de dados
│   ├── models/
│   │   └── contaModel.js        # Modelos de dados reutilizáveis
│   ├── services/
│   │   ├── contaService.js      # Lógica de negócio (REST e GraphQL)
│   │   ├── loginService.js
│   │   └── transferenciaService.js
│   └── utils/
│       └── errorHandler.js      # Funções utilitárias e genéricas
├── rest/
│   ├── app.js                   # Configuração específica do REST
│   ├── controllers/
│   │   ├── contaController.js
│   │   ├── loginController.js
│   │   └── transferenciaController.js
│   ├── middlewares/
│   │   └── authMiddleware.js    # Middleware REST (autenticação, etc.)
│   ├── routes/
│   │   ├── contaRoutes.js
│   │   ├── loginRoutes.js
│   │   └── transferenciaRoutes.js
├── graphql/
│   ├── app.js                   # Configuração específica do GraphQL
│   ├── resolvers/
│   │   ├── index.js
│   │   ├── queryResolvers.js
│   │   └── mutationResolvers.js
│   ├── schema/
│   │   └── index.js             # Combina typeDefs e resolvers
│   ├── typeDefs.js              # Definições de schema
├── config/
│   └── serverConfig.js          # Configurações comuns (porta, ambiente, etc.)
├── .env                         # Variáveis de ambiente
├── package.json
└── README.md
```

## Iniciando o Projeto

### **Requisitos**

- Node.js (versão 16 ou superior)
- MySQL (ou um banco de dados compatível)

### **Instalação**

1. Clone o repositório:
    ```bash
    git clone https://seu-repositorio.git
    cd banco-api
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o banco de dados:
    - Altere o arquivo `.env` com as credenciais do seu banco de dados.

4. Suba os serviços:

   **REST API**:  
   Acesse a API REST rodando no **porta 3000**:
   ```bash
   npm run rest-api
   ```

   **GraphQL API**:  
   Acesse a API GraphQL rodando no **porta 3001**:
   ```bash
   npm run graphql-api
   ```

### **Endpoints da API REST**

A API REST expõe os seguintes endpoints:

- **GET /contas**: Retorna todas as contas.
- **GET /transferencias**: Retorna transferências com paginação (`page` e `limit` como parâmetros).
- **POST /login**: Realiza o login e retorna um token JWT.
- **POST /transferir**: Realiza uma transferência entre contas (precisa de MFA Token).

### **Endpoints da API GraphQL**

A API GraphQL usa o Apollo Server e está disponível na rota `/graphql` (porta **3001**).

#### **Tipos de Dados**

1. **Conta**
   - Representa uma conta bancária.
   
2. **Transferência**
   - Representa uma transferência entre contas.

3. **AuthPayload**
   - Representa a resposta de autenticação com o token JWT.

#### **Queries**
1. **contas**: Retorna todas as contas bancárias.
2. **transferencias**: Retorna a lista de transferências realizadas, com suporte à paginação.

#### **Mutations**
1. **login**: Realiza o login e retorna um token JWT.
2. **transferir**: Realiza uma transferência entre contas, validando o token MFA.

#### **Exemplo de Requisição usando cURL**

##### 1. **Login** (Mutation)

```bash
curl -X POST http://localhost:3001/graphql -H "Content-Type: application/json" -d '{
  "query": "mutation { login(username: \"usuario\", senha: \"senha\") { token message } }"
}'
```

##### 2. **Realizar Transferência** (Mutation)

```bash
curl -X POST http://localhost:3001/graphql -H "Content-Type: application/json" -H "Authorization: Bearer seu-token-jwt-aqui" -d '{
  "query": "mutation { transferir(contaOrigem: 1, contaDestino: 2, valor: 1500.00, mfaToken: \"seu-token-mfa\") }"
}'
```

##### 3. **Consultar Transferências** (Query)

```bash
curl -X POST http://localhost:3001/graphql -H "Content-Type: application/json" -d '{
  "query": "query { transferencias(page: 1, limit: 10) { id conta_origem_id conta_destino_id valor data_hora } }"
}'
```

---

Com a implementação acima, o projeto está pronto para ser executado. Sinta-se à vontade para explorar a API REST e a API GraphQL conforme necessário!
