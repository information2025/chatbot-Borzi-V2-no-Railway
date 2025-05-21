# Imagem oficial do Puppeteer com Node e Chromium configurados
FROM ghcr.io/puppeteer/puppeteer:latest

# Define o diretório de trabalho
WORKDIR /app

# Copia tudo para dentro da imagem
COPY . .

# Instala dependências do Node.js do projeto
RUN npm install

# Roda o chatbot
CMD ["npm", "start"]
