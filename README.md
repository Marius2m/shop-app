# shop-app
For this project I am using the following stack:
* Frontend
  * React + TypeScript + SCSS + CSS Modules
* Backend
  * NodeJS + TypeScript + Express
* DB
  * Neo4j

### How these integrate together:
The frontend app will of offer the following functionality:
* friendly and intuitive UI
* page for displaying searched products by title
* page to see all products in the shop
* page see a specific product's page
* pagination for all pages

The purpose of the backend is to serve the necessary data for displaying the products on the frontend. It is a REST API with two endpoints:
* /search   <-- retrieve products paginated based on search term / filter
* /products <-- CRUD operations
* /health   <-- GET to check server status

The DB is a simple Neo4j where each product is stored/ retrieved by the nodeJS server
