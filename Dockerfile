FROM node:dubnium-alpine

WORKDIR /opt/app

RUN apk add --update git openssh openssl && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*
COPY package*.json /opt/app/


RUN rm /.env

RUN npm install 
COPY . .

CMD ["npm", "run", "start"]