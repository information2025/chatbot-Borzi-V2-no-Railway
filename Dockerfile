# Imagem base com Node.js
FROM node:18

# Instala dependências do Chromium para puppeteer funcionar
RUN apt-get update && apt-get install -y \
    chromium \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libxss1 \
    libgtk-3-0 \
    libxshmfence1 \
    libglu1 \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Cria diretório do app
WORKDIR /app

# Copia arquivos do projeto
COPY . .

# Instala dependências do Node.js
RUN npm install

# Define comando de inicialização
CMD ["npm", "start"]