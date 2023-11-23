# 🛍 Loomi Store

Um E-commerce de equipamentos Eletronicos feito utilizando os Frameworks RestJS no back e Banco de Dados feito com Prisma e Postgresql.

*******
Tabelas de conteúdo 
 1. [Experimente](#experimente)
 2. [Pré requisitos](#prerequisitos)
 3. [Pondo o E-commece para funcionar:](#funcionando)
 4. [Features](#features)
 5. [Feito Utilizando](#built)

*******
<div id='experimente'/>  

## 👾 Experimente 

Você pode Experimentar clianco aqui no [E-commerce]().

*******
<div id='prerequisitos'/>  

## 🚀 Começo

Estas instruções permitirão que você obtenha uma cópia de trabalho do projeto em sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
[Git](https://git-scm.com), 
[PostgreSQL](https://www.postgresql.org/), 
[NodeJS](https://nodejs.org/en) e
[Docker](https://www.docker.com/).

Também é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

*******
<div id='funcionando'/>  

### 🎲 Colocando o Chatbot para funcionar:

```bash
# Clone o repositorio
$ git clone https://github.com/raphaeltcf/E-commerce
```

### No Windows: 

```bash
# Back-End

# Acesse a pasta do projeto em terminal/cmd
$ cd E-commerce

# Instale as dependencias
npm i

# Faça as migrações do banco 
npx prisma migrate dev --name "init"

# Para funcionar:
$ npm start dev

# Front-End
Só ir para a rota http://localhost:12345/api e utilizar a aplicação via swagger

# Run the app in the Browser
```

### No Docker
```bash
# Acesse a pasta do projeto em terminal/cmd
$ cd E-commerce


# Inicie o Docker 
$ docker-compose up


```
### No Linux

```bash
# Acesse a pasta do projeto em terminal/cmd
$ cd E-commerce


# Instale as bibliotecas: 
$ sudo apt update
$ sudo apt install nodejs npm
$ node -v
$ npm -v
$ npm i 

# Para funcionar: 
$ npm start

```

*******
<div id='features'/>  

### ✅ Features

- [x] Integrado com o banco de dados Postgresql utilizando Prisma
- [x] Tratamento de erros
- [x] CRUD de Produtos
- [x] CRUD de usuarios
- [x] Integração com serviço de envio de e-mail
- [x] Calculando os preços
- [x] Atualização de estoque
- [x] Integrado com plataforma de pagamento simulada
- [x] Integrado com AWS S3
- [X] Swagger
- [X] Permissionamento
- [X] Autenticação
- [X] Teste unitários
- [X] Relatórios Customizados 
- [x] Executando em um contêiner Docker
 
*******
<div id='built'/>  

## 🛠️ Feito utilizando
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="40" height="40" />  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg" width="40" height="40" />  <img src="https://devicons.railway.app/i/prisma-dark.svg" width="40" height="40" />  
          
          

