FROM node

WORKDIR /App

COPY packege.json /App

RUN npm install

COPY . /App

EXPOSE 3000

CMD [ "node","main.ts" ]