# Read Nutrients

![Read Nutrients Logo](https://via.placeholder.com/150)

Read Nutrients é uma aplicação que permite consultar dados nutricionais de produtos a partir do código de barras, seja escaneado ou digitado manualmente.

## 🚀 Demonstração

A aplicação está disponível em produção. Você pode acessá-la através do seguinte link:

🔗 [Read Nutrients - Acesse Aqui](https://seu-dominio-aqui.com)

## 📜 Funcionalidades

- 📸 **Escaneamento de código de barras**
- ⌨️ **Entrada manual de código de barras**
- 📊 **Exibição de informações nutricionais detalhadas**
- 🔍 **Consulta de produtos utilizando IA**

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Express, Prisma, Google Generative AI
- **Banco de Dados:** PostgreSQL (Docker)
- **Infraestrutura:** API minimalista em .NET

## ⚡ Como Executar Localmente

### Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Passos

1. Clone o repositório:
   ```sh
   git clone https://github.com/henriquedev24/Read-Nutrients.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd Read-Nutrients
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie o banco de dados com Docker:
   ```sh
   docker-compose up -d
   ```
5. Configure as variáveis de ambiente:
   ```sh
   cp .env.example .env
   ```
   Edite o arquivo `.env` com as configurações corretas.
6. Execute as migrações do banco:
   ```sh
   npx prisma migrate dev
   ```
7. Inicie o servidor:
   ```sh
   npm run dev
   ```

A aplicação estará disponível em: `http://localhost:3000`

## 📄 Documentação da API

Para mais detalhes sobre os endpoints disponíveis, consulte a documentação:

📚 [API Documentation](https://seu-dominio-aqui.com/docs)

## 🤝 Contribuição

Sinta-se à vontade para contribuir! Abra uma issue ou envie um pull request.

## 📝 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

💡 Desenvolvido por [Gabriel Henrique Carvalho de Sousa](https://github.com/henriquedev24)

