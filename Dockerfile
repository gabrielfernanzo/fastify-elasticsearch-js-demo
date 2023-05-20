FROM node:18.14.0-alpine
WORKDIR /code
COPY package.json .
RUN npm i
COPY . .
