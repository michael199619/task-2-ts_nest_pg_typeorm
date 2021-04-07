FROM node:12

RUN mkdir /app
WORKDIR /app

COPY ./node_modules ./node_modules
COPY ./src ./src
COPY ./*.json ./
COPY ./*.js ./
RUN npm run build

CMD npm run start:prod
