FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install --include=dev

COPY . .

RUN npm run build

EXPOSE 9000

CMD [ "npm", "run", "my:start" ]
