FROM node:latest

WORKDIR /app

COPY . .

RUN npm install -g nodemon
RUN npm install

EXPOSE 5000

CMD ["npm","start"]