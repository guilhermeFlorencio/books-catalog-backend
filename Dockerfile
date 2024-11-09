FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN echo "Iniciando o processo de build..." && npm run build

RUN echo "Conteúdo da pasta dist:" && ls -la dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
