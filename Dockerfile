# Usamos uma imagem base com Node.js e Chromium já pronto para Puppeteer
FROM ghcr.io/puppeteer/puppeteer:latest

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do seu projeto para o container
COPY . .

# Instala as dependências do Node.js
RUN npm install

# Porta padrão (caso você use algum servidor — opcional)
EXPOSE 3000

# Comando para iniciar o bot
CMD ["npm", "start"]
