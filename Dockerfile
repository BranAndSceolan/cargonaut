FROM node:16.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 8008
RUN npm run build
ENTRYPOINT ["npm", "run", "start"]

FROM mongo:4.2.6

ENV MONGO_INIT_ROOT_USERNAME cargonautDB
ENV MONGO_INITDB_ROOT_PASSWORD password
ENV MONGO_INITDB_DATABASE moviedb

ADD index.ts /docker-entrypoint-initdb.d/
