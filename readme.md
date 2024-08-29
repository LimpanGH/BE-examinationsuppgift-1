# **Industry Management System (IMS)**

## **Objective**

The goal of this group assignment (maximum of three per group) is to design and implement two APIs that interact with a MongoDB database. One API will be a RESTful API, and the other will be built using GraphQL. Both APIs will manage an Industry Management System (IMS) where users can perform CRUD (Create, Read, Update, Delete) operations on products, manufacturers, and their contacts. The data will be modeled using nested documents within MongoDB.

The requirements can freely be expanded on with your own ideas.

## **Tools and Technologies**

- **Backend Framework:** Node.js, Express
- **Database:** MongoDB
- **ODM:** Mongoose
- **API Technologies:** RESTful API, GraphQL

## **Task 1: RESTful API**

### **Requirements**

1. **Setup RESTful API**
   - Create a `Express` server.
   - Connect to a `MongoDB` database using `Mongoose`.
   - Define the `Product` model with nested documents and the following fields:
      - Product
        - name
        - sku
        - description
        - price
        - category
        - manufacturer
        - amountInStock
      - Manufacturer
        - name
        - country
        - website
        - description
        - address
        - contact
      - Contact
        - name
        - email
        - phone

2. **Implement the following RESTful Routes**
    - `GET /api/products` - Retrieve a list of all products, including their manufacturer and contact.
    - `GET /api/products/:id` - Retrieve details of a single product by ID, including its manufacturer and contact.
    - `POST /api/products` - Create a new product.
    - `PUT /api/products/:id` - Update a product by ID.
    - `DELETE /api/products/:id` - Delete a product by ID.

3. **Additional Endpoints**
   - **Summarize the total value of all products in stock**
     - `GET /api/products/total-stock-value`

   - **Summarize the total value of products in stock per manufacturer**
     - `GET /api/products/total-stock-value-by-manufacturer`

   - **Retrieve a list of all products with less than 10 units in stock**
     - `GET /api/products/low-stock`

   - **Retrieve a compact list of products with less than 5 items in stock (including only the manufacturer's and the contact's name, phone and email)**
     - `GET /api/products/critical-stock`

   - **Retrieve a list of all manufacturers the company does business with**
     - `GET /api/manufacturers`

## **Task 2: GraphQL API**

### **Requirements**

1. **Setup the GraphQL API**
   - Create a new `Express` server instance or use the existing one.
   - Integrate `GraphQL` with `Express` using `express-graphql`.
   - Connect to the same `MongoDB` database using `Mongoose`.

2. **Define the GraphQL Schema**
   - Define the GraphQL types following the same model as Task 1.
   - Define the following queries (same as Task 1):
     - `products`: Retrieve a list of all products.
     - `product(id: ID!)`: Retrieve details of a single product by ID.
     - `totalStockValue`: Retrieve the total value of all products in stock.
     - `totalStockValueByManufacturer`: Retrieve the total value of products in stock, grouped by manufacturer.
     - `lowStockProducts`: Retrieve a list of products with less than 10 units in stock.
     - `criticalStockProducts`: Retrieve a compact list of products with less than 5 units in stock, including the manufacturer’s name, contact name, phone, and email.
     - `manufacturers`: Retrieve a list of all manufacturers the company is doing business with.

   - Define the following mutations:
     - `addProduct`: Create a new product.
     - `updateProduct`: Update an existing product by ID.
     - `deleteProduct`: Delete a product by ID.

3. **Resolvers**

    - Implement resolvers to handle the queries and mutations, ensuring nested documents (manufacturer and contact) are properly handled.
    - Implement the logic for the specific queries related to stock value, low stock products, critical stock products, and manufacturers.

4. **Test the API using GraphQL Playground**
   - Use GraphQL Playground to test the queries and mutations.

## **Bonus (not required)**

- **Generate test data**
  - Generate random test data (more than 1000 documents) to populate the database with

- **Create a frontend**
  - Create a frontend that uses the routes/queries

- **Pagination and Filtering**
  - Implement pagination on the `products` query in the GraphQL API.
  - Implement filtering by `category`, `manufacturer` name, and `amountInStock` in both APIs.

- **Validation and Error Handling**
  - Add validation for required fields and ensure that nested documents are properly handled.
  - Implement error handling for cases such as not found errors, validation errors, etc.

- **Advanced Error Handling**
  - Implement more sophisticated error handling in the GraphQL API, making use of GraphQL's error handling mechanisms.

- **Other ideas**
  - The requirements can freely be expanded on with your own ideas

## **Submission**

- Submit your group's code as a GitHub repository.
- Final date for submission: **Wednesday 25th of September**
- On 25th of September every group will also do a short live presentation (max 10 minutes)

## **Kursmål**

- Bara för godkänt, VG betygsätts ej.
- Grundläggande färdighet och kunskap i Express, REST-API, MongoDb, Mongoose, GraphQL
