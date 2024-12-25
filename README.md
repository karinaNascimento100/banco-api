
# Banco API

Este projeto implementa uma API para realizar operações bancárias, como login de usuário e transferências entre contas, com autenticação via **JWT**. A API realiza verificações de saldo, contas ativas e oferece segurança adicional para transferências grandes.

## Funcionalidades

- **Login de Usuário**: Realiza autenticação via nome de usuário e senha e retorna um token JWT.
- **Transferências**: Permite transferências entre contas, com verificações de saldo e contas ativas, e segurança extra para transferências acima de R$ 5000.
- **Consulta de Transferências**: Recupera o histórico de transferências realizadas com suporte à paginação.

## Requisitos

- **Node.js** (versão 16 ou superior)
- **MySQL** ou outro banco de dados compatível com MySQL
- **Postman** ou outro cliente HTTP para testar a API

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/juliodelimas/banco-api.git
   cd banco-api
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure o arquivo `.env`** com as variáveis de ambiente para o banco de dados e JWT:

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=banco
   JWT_SECRET=sua_chave_secreta
   PORT=porta-da-api
   ```

4. **Inicie o servidor**:

   ```bash
   npm run dev
   ```

   O servidor estará disponível em [http://localhost:3000](http://localhost:3000).

## Endpoints da API

### 1. **Login de Usuário**
- **URL**: `/login`
- **Método**: `POST`
- **Descrição**: Autentica o usuário e retorna um token JWT.
  
- **Corpo da Requisição**:

  ```json
  {
    "username": "usuario",
    "senha": "senha"
  }
  ```

- **Respostas**:
  - `200 OK`: Token gerado com sucesso.
  - `400 Bad Request`: Parâmetros de login ausentes.
  - `401 Unauthorized`: Credenciais inválidas.

### 2. **Realizar Transferência**
- **URL**: `/transferencia`
- **Método**: `POST`
- **Descrição**: Realiza uma transferência entre contas, com verificações de saldo e contas ativas. Para transferências acima de R$ 5000,00, um token JWT é necessário.

- **Autenticação**: **Requer token JWT no cabeçalho `Authorization`**.

- **Corpo da Requisição**:

  ```json
  {
    "contaOrigem": 1,
    "contaDestino": 2,
    "valor": 1500.00,
    "token": "seu-token-jwt-aqui"
  }
  ```

- **Respostas**:
  - `201 Created`: Transferência realizada com sucesso.
  - `400 Bad Request`: Parâmetros inválidos.
  - `401 Unauthorized`: Token JWT inválido ou ausente.
  - `422 Unprocessable Entity`: Erro de validação (ex. saldo insuficiente).
  - `500 Internal Server Error`: Erro no servidor.

### 3. **Listar Transferências**
- **URL**: `/transferencia`
- **Método**: `GET`
- **Descrição**: Lista as transferências realizadas, com suporte à paginação.

- **Parâmetros**:
  - `page` (opcional): Página dos resultados (padrão: 1).
  - `limit` (opcional): Número de resultados por página (padrão: 10).

- **Respostas**:
  - `200 OK`: Lista de transferências.
  - `500 Internal Server Error`: Erro ao buscar transferências.

## Documentação da API

A documentação completa da API pode ser acessada através do **Swagger UI**:

- **Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Estrutura do Banco de Dados

As principais tabelas no banco de dados são:

1. **contas**: Armazena as contas bancárias (id, titular, saldo, status).
2. **transferencias**: Armazena as transferências realizadas (id, conta origem, conta destino, valor, data/hora, status).
3. **usuarios**: Armazena os usuários (nome de usuário, senha).

### SQL para criação das tabelas:

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

## Licença

Este projeto é licenciado sob a **MIT License**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
