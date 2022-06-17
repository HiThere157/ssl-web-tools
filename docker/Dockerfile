FROM alpine

RUN apk add --update nodejs npm bind-tools

COPY ./dist /app/dist
COPY ./server /app/server

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

WORKDIR /app
RUN npm install

EXPOSE 9000

CMD [ "node", "server/server.js" ]