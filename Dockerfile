# Usa uma imagem oficial do Node.js leve
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos essenciais para instalar dependências primeiro
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install --omit=dev

# Copia o restante dos arquivos do projeto para dentro do contêiner
COPY . .

# Expõe a porta usada pelo app
EXPOSE 3018

# Define variáveis de ambiente
ENV NODE_ENV=production

# Comando para iniciar o servidor
CMD ["npm", "start"]
