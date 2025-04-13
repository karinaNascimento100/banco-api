
# Banco API - Documentação

## Visão Geral

O projeto é composto por duas APIs independentes que oferecem suporte a operações financeiras, com uma arquitetura baseada em REST e GraphQL.

- **API REST**: Roda na porta `3000` e gerencia endpoints de contas e transferências.
- **API GraphQL**: Roda na porta `3001` e fornece operações para consultas e mutações no domínio financeiro.

---

## Pré-requisitos

Antes de iniciar, certifique-se de que você tenha as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- Gerenciador de pacotes npm (vem com o Node.js)

---

## Instruções de Configuração

### 1. Variáveis de Ambiente (`.env`)
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=banco
JWT_SECRET=sua_chave_secreta
PORT=3000
GRAPHQLPORT=3001
```

### 2. Inicialização do Banco de Dados

1. Crie o banco de dados e suas tabelas executando o script abaixo no MySQL:
   ```sql
   CREATE DATABASE banco;
   USE banco;

   CREATE TABLE contas (
       id INT AUTO_INCREMENT PRIMARY KEY,
       titular VARCHAR(100) NOT NULL,
       saldo DECIMAL(10, 2) NOT NULL,
       ativa BOOLEAN DEFAULT TRUE
   );

   CREATE TABLE transferencias (
       id INT AUTO_INCREMENT PRIMARY KEY,
       conta_origem_id INT NOT NULL,
       conta_destino_id INT NOT NULL,
       valor DECIMAL(10, 2) NOT NULL,
       data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
       autenticada BOOLEAN DEFAULT FALSE,
       FOREIGN KEY (conta_origem_id) REFERENCES contas(id),
       FOREIGN KEY (conta_destino_id) REFERENCES contas(id)
   );

   CREATE TABLE usuarios (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(50) NOT NULL UNIQUE,
       senha VARCHAR(255) NOT NULL
   );
   ```

2. Verifique se as tabelas foram criadas corretamente:
   ```sql
   USE banco;
   SHOW TABLES;
   ```

---

## Instruções de Execução

### 1. Instalar Dependências
Execute o comando abaixo na raiz do projeto:
```bash
npm install
```

### 2. Executar APIs
- Para iniciar a **API REST**:
  ```bash
  npm run rest-api
  ```
- Para iniciar a **API GraphQL**:
  ```bash
  npm run graphql-api
  ```

---

## Serviços Disponíveis Após a Inicialização

### ApolloServer
Depois de iniciar a API GraphQL, o ApolloServer estará disponível na porta `3001`. Ele oferece uma interface interativa no endereço [http://localhost:3001/graphql](http://localhost:3001/graphql), onde é possível explorar o schema, testar queries e mutações, e visualizar resultados em tempo real.

O ApolloServer é uma biblioteca amplamente utilizada para implementar servidores GraphQL. Ele simplifica o desenvolvimento, fornecendo suporte para definir schemas, resolvers, autenticação, entre outros recursos.

### Swagger
Após a inicialização da API REST, a documentação interativa estará disponível no Swagger, no endereço [http://localhost:3000/api-docs](http://localhost:3000/api-docs). Essa documentação permite:
- Explorar os endpoints disponíveis.
- Testar requisições diretamente pelo navegador.
- Obter informações detalhadas sobre parâmetros, respostas e erros.

Para visualizar o Swagger, certifique-se de que a API REST esteja em execução.

---

## Estrutura do Projeto

```plaintext
project/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── contaModel.js
│   ├── services/
│   │   ├── contaService.js
│   │   ├── loginService.js
│   │   └── transferenciaService.js
│   └── utils/
│       └── errorHandler.js
├── rest/
│   ├── app.js
│   ├── controllers/
│   │   ├── contaController.js
│   │   ├── loginController.js
│   │   └── transferenciaController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── contaRoutes.js
│   │   ├── loginRoutes.js
│   │   └── transferenciaRoutes.js
├── graphql/
│   ├── app.js
│   ├── resolvers/
│   │   ├── index.js
│   │   ├── queryResolvers.js
│   │   └── mutationResolvers.js
│   ├── schema/
│   │   └── index.js
│   ├── typeDefs.js
├── config/
│   └── serverConfig.js
├── .env
├── package.json
└── README.md
```

---

## GraphQL API

### Endpoints
- URL da API GraphQL: `http://localhost:3001/graphql`

### Definições do Schema (`typeDefs`)
- **Queries**:
  - `contas`: Retorna a lista de contas.
  - `transferencias(page: Int, limit: Int)`: Retorna uma lista paginada de transferências.
- **Mutations**:
  - `login(username: String!, senha: String!)`: Autentica um usuário e retorna um token JWT.
  - `transferir(contaOrigem: Int!, contaDestino: Int!, valor: Float!, mfaToken: String!)`: Realiza uma transferência.

### Exemplo de Requisição com `curl`

#### Consulta de Contas
```bash
curl -X POST http://localhost:3001/graphql -H "Content-Type: application/json" -d '{"query": "{ contas { id titular saldo ativa } }"}'
```

#### Transferência de Fundos
```bash
curl -X POST http://localhost:3001/graphql -H "Content-Type: application/json" -d '{"query": "mutation { transferir(contaOrigem: 1, contaDestino: 2, valor: 100.0, mfaToken: \"123456\") }"}'
```

---

## REST API

### Endpoints
Base URL: `http://localhost:3000`

- **GET /contas**: Retorna todas as contas.
- **POST /login**: Realiza a autenticação de um usuário.
- **POST /transferencias**: Realiza uma transferência entre contas.
