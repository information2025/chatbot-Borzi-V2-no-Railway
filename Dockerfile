FROM node:18

# Instala dependências do sistema necessárias pro Chromium funcionar
RUN apt-get update && apt-get install -y \
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
    chromium \
    --no-install-recommends && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Define diretório da aplicação
WORKDIR /app

# Copia arquivos
COPY . .

# Instala dependências
RUN npm install

# Define variáveis do Chromium para o puppeteer-core
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Comando de inicialização
CMD ["npm", "start"]
