# shop-app
For this project I am using the following stack:
* Frontend
  * React + TypeScript + SCSS + CSS Modules + AntDesign UI library
* Backend
  * NodeJS + TypeScript + Express
* DB
  * Neo4j

## How these integrate together:
The frontend app will offer the following functionality:
* friendly and intuitive UI
* page for displaying searched products by title
* page to browse all products in the shop
* page to see a specific product's page
* pagination for all pages

The purpose of the backend is to serve the necessary data for displaying the products on the frontend. Logs are handled by winston logging library, and the apis are built with Express. It is a REST API with 3 endpoints:
* /search   <-- GET - retrieve products paginated based on search term (/ filter not implemented)
* /products <-- CRUD operations
* /health   <-- GET - check server status

The DB is a simple Neo4j where each product is stored/ retrieved by the nodeJS server

## How to run:
#### Variant A. Using docker files:
1. front-end
* build step:
```
docker build -t <img_name> <path-to-dockerfile>
ex: docker build -t shopfe .
```
* run step:
```
docker run -it --rm -p 3000:3000 shopfe
```
2. back-end
* build step:
```
docker build -t <img_name> <path-to-dockerfile>
ex: docker build -t shopbe .
```
* run step:
```
docker run --name productsapi -p 4000:4000 -d --env NEO4J_USER=neo4j --env NEO4J_PASS=<> --env NEO4J_URL=<> shopbe
```

#### Variant B. Using docker compose:
* create a .env file in the root of this project (same lvl as client and server directories)
```
📦 shop-app
 ┣── 📂 client
 ┣── 📂 server
 ┣── 📜 .env
 ┗── 📜 docker-compose.yml
```
* add the following to the file:
```
NEO4J_USER=""
NEO4J_PASS=""
NEO4J_URL=""
```
* make sure you are in the root of the project and then RUN:
```
docker-compose —env-file ./.env up -d 
or docker compose —env-file ./.env up -d
```
##### Verify backend:
* using postman or curl:
```
curl --location --request GET 'http://localhost:4000/health'
curl --location --request GET 'http://localhost:4000/products'
```
##### Verify frontend:
* on any browser, access:
```
http:localhost:3000
```

## Future plans:
Since the project is at the beginning there are improvements that can be done:
#### Frontend
- [ ] add auth pages to restrict users from certain functionality & parts of the app
- [ ] refine product page and make it more responsive
- [ ] create user roles so admins/ merchants can make changes on the web (add/ update/ remove products)
- [ ] implement home, cart, favorites pages
- [ ] show users recommended products
- [ ] add skeleton for components (placeholder while content loads)

#### Backend
- [ ] create routes for auth to secure endpoints
- [ ] improve search endpoint (add filters, add full-text search, add sorting)
- [ ] add validation on routes (query/ path params, body)
- [ ] create route for recommending content to the user

#### Infrastructure
- [ ] deploy client & server (ex: Amazon S3, Lambda)
- [ ] add caching for products (ex: Amazon API Gateway)
- [ ] create a cron job that triggers a sync of imported products with the db on a daily basis (ex: Amazon CloudWatch)
