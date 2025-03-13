# Usar a imagem oficial do Node.js como base
FROM node:16

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalar as dependências do projeto dentro do contêiner
RUN npm install

# Copiar todo o conteúdo do projeto para o contêiner
COPY . .

# Expor a porta em que o servidor vai rodar (por exemplo, 3000)
EXPOSE 3000

# Rodar o aplicativo
CMD ["npm", "start"]
