FROM node:current-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./src/ ./src/
COPY server.js .

EXPOSE 3000

CMD [ "npm", "start" ]