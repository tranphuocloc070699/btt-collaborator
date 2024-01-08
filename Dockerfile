FROM node:18-alpine
WORKDIR /var/www/html/collaborator_service


COPY . .

RUN cd client && yarn install --peer
RUN cd proxy && yarn install --peer

RUN cd client && npm run build

EXPOSE 3000

CMD ["node","./proxy/server.js"]
    