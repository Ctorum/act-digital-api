FROM node:16.13.0-alpine

WORKDIR /app

COPY ./package.json .
RUN npm cache clean --force
RUN npm install
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]