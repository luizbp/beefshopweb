# BeefShop - Instruções de Execução

Este guia fornece as instruções necessárias para configurar e executar o ambiente de desenvolvimento local do projeto BeefShop.

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:

* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) ou superior.
* [Node.js](https://nodejs.org/) (que inclui o `npm`).
* Um editor de código de sua preferência (ex: Visual Studio Code).

## 🚀 Backend (ASP.NET 8)

A API do projeto está localizada na pasta `backend`.

1.  **Navegue até a pasta da API:**
    ```bash
    cd backend/BeefShopAPI.Controller
    ```

2.  **Restaure as dependências do .NET:**
    ```bash
    dotnet restore
    ```

3.  **Execute a aplicação:**
    ```bash
    dotnet run
    ```
    
    A API estará em execução e acessível, por padrão, em `https://localhost:7xxx` ou `http://localhost:5xxx`. Verifique o terminal para a URL exata.

## ⚛️ Frontend (React + Vite)

A interface do usuário está localizada na pasta `frontend`.

1.  **Abra um novo terminal** e navegue até a pasta do projeto frontend:
    ```bash
    cd frontend/BeefShopWeb
    ```

2.  **Instale as dependências do Node.js:**
    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

    A aplicação React estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite no terminal). O frontend já deve estar configurado para se comunicar com a API em execução.