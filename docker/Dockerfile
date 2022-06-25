FROM node:slim

RUN apt update && apt install -y --no-install-recommends \
  iputils-ping dnsutils whois nmap traceroute \
  dos2unix bsdmainutils procps ntp

COPY ./dist /app/dist
COPY ./server /app/server

RUN find /app/server/vendor/testssl.sh -type f -exec dos2unix {} \;
RUN ln -s /app/server/vendor/testssl.sh/testssl.sh /usr/local/bin/testssl.sh

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

WORKDIR /app
RUN npm install

EXPOSE 9000
VOLUME [ "/app/config" ]
VOLUME [ "/caCerts" ]

CMD [ "node", "server/server.js", "--with-docker-volume" ]