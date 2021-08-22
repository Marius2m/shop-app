FROM node:14

WORKDIR /productsApi

COPY . .

RUN npm install \
    && apt update \
    && apt install -y vim nmap

RUN npm run build

EXPOSE 4000:4000

CMD ["node", "./dist/bundle.js"]