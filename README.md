# **Bookstore API**

## **Project Overview**

This project is a RESTful API for a bookstore application built using **Node.js**, **Express**, and **TypeScript**. The API allows you to manage books, authors, and categories in the bookstore. Users can create, read, update, and delete books, authors, and categories. The API also validates input data and handles errors appropriately.

---

## **Table of Contents**
1. [Technologies Used](#technologies-used)
2. [Installation & Setup](#installation-setup)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)
   - [Books](#books)
   - [Authors](#authors)
   - [Categories](#categories)
5. [Testing](#testing)
6. [Error Handling](#error-handling)
7. [Folder Structure](#folder-structure)
8. [Contributing](#contributing)
9. [License](#license)

---

## **Technologies Used**
- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express**: Web framework for Node.js, used to build the API.
- **TypeScript**: Superset of JavaScript, adds static types.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **Jest**: JavaScript testing framework for writing unit tests.
- **Supertest**: HTTP assertions for testing Express routes.

---

## **Installation & Setup**

To get started with this project, follow the instructions below:

### 1. Clone the repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/Akintola-Stephen/bookstore-api.git
cd bookstore-api
```

### 2. Install dependencies
Install the required dependencies using `npm` or `yarn`:

```bash
npm install
```
or
```bash
yarn install
```

### 3. Configure environment variables
Create a `.env` file in the root directory of the project to store your environment variables, such as the MongoDB URI. Below is an example:

```bash
MONGO_URI=mongodb://localhost:27017/bookstore
PORT=5000
```

Make sure to replace the `MONGO_URI` with your actual MongoDB URI if it's hosted elsewhere.

### 4. Run the project
To start the API server, run the following command:

```bash
npm start
```

The API will be running on [http://localhost:5000](http://localhost:5000) by default.

For development purposes, you can use `nodemon` to automatically restart the server on code changes:

```bash
npm run dev
```

---

## **Usage**

Once the API server is running, you can interact with it using **Postman** or any other API client.

### **API Base URL**

The base URL for all endpoints is:

```
http://localhost:5000/api
```

---

## **API Endpoints**

Here is the list of all available endpoints for the Bookstore API:

### **Books**

- **Create a new book**  
  `POST /api/books`  
  **Request Body**:
  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "category": "Fiction",
    "publicationYear": 1925,
    "isbn": "9780743273565"
  }
  ```

- **Get a list of all books**  
  `GET /api/books`

- **Get details of a specific book**  
  `GET /api/books/:id`  
  **Response**:
  ```json
  {
    "_id": "60b722e9f7c92a55d014b034",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "category": "Fiction",
    "publicationYear": 1925,
    "isbn": "9780743273565"
  }
  ```

- **Update a book**  
  `PUT /api/books/:id`  
  **Request Body**:
  ```json
  {
    "title": "The Great Gatsby - Updated",
    "author": "F. Scott Fitzgerald",
    "category": "Classic Fiction",
    "publicationYear": 1926,
    "isbn": "9780743273565"
  }
  ```

- **Delete a book**  
  `DELETE /api/books/:id`

---

### **Authors**

- **Create a new author**  
  `POST /api/authors`  
  **Request Body**:
  ```json
  {
    "name": "F. Scott Fitzgerald",
    "birthYear": 1896,
    "nationality": "American"
  }
  ```

- **Get a list of all authors**  
  `GET /api/authors`

- **Get details of a specific author**  
  `GET /api/authors/:id`  
  **Response**:
  ```json
  {
    "_id": "60b722e9f7c92a55d014b036",
    "name": "F. Scott Fitzgerald",
    "birthYear": 1896,
    "nationality": "American"
  }
  ```

- **Update an author**  
  `PUT /api/authors/:id`  
  **Request Body**:
  ```json
  {
    "name": "F. Scott Fitzgerald - Updated",
    "birthYear": 1897,
    "nationality": "American"
  }
  ```

- **Delete an author**  
  `DELETE /api/authors/:id`

---

### **Categories**

- **Create a new category**  
  `POST /api/categories`  
  **Request Body**:
  ```json
  {
    "name": "Fiction"
  }
  ```

- **Get a list of all categories**  
  `GET /api/categories`

- **Get details of a specific category**  
  `GET /api/categories/:id`  
  **Response**:
  ```json
  {
    "_id": "60b722e9f7c92a55d014b037",
    "name": "Fiction"
  }
  ```

- **Update a category**  
  `PUT /api/categories/:id`  
  **Request Body**:
  ```json
  {
    "name": "Science Fiction"
  }
  ```

- **Delete a category**  
  `DELETE /api/categories/:id`

---

## **Testing**

### 1. Install Testing Dependencies

To run the tests, first install Jest and Supertest:

```bash
npm install --save-dev jest supertest @types/jest ts-jest
```

### 2. Run Tests

You can run the tests using the following command:

```bash
npm test
```

This will run Jest, which will execute all unit tests in the project. You should see a summary of the test results.

### **Writing Tests**

Unit tests for each route are written using Jest and Supertest. Below is an example of testing the `POST /api/books` route:

```typescript
import request from 'supertest';
import app from '../app';

describe('Books API', () => {
  it('should create a new book', async () => {
    const bookData = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      category: 'Fiction',
      publicationYear: 1925,
      isbn: '9780743273565'
    };

    const response = await request(app)
      .post('/api/books')
      .send(bookData)
      .expect(201);

    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('_id');
  });
});
```

---

## **Error Handling**

The API uses a centralized error handler to catch and return errors consistently across all routes.

- **Validation Errors**: Invalid data will result in a `400 Bad Request` status with an appropriate error message.
- **Not Found Errors**: When a resource is not found, the API will return a `404 Not Found` status.
- **Internal Server Errors**: Any unhandled errors will return a `500 Internal Server Error` status.

Example of error response:

```json
{
  "status": "error",
  "message": "Book not found"
}
```

---

## **Folder Structure**

Here’s the structure of the project:

```
/bookstore-api
│
├── /src
│   ├── /controllers     # Controller files handling the business logic
│   ├── /models          # Mongoose models
    ├── /middlewares          # Middleware tests intercepting requests/response body
    ├── /validation          # ZOD validation implementation
│   ├── /routes          # API routes for books, authors, and categories
│   ├── /utils           # Utility files (error handling, pagination)
│   ├── app.ts           # Express app configuration
│   ├── server.ts        # Entry point for the application
│
├── /tests               # Unit tests for routes
│   └── bookRoutes.test.ts
│
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── jest.config.js       # Jest configuration
├── .env                 # Environment variables
└── README.md            # Project documentation
```

---

## **Contributing**

We welcome contributions to this project! If you have suggestions or find bugs, feel free to submit issues or pull requests.

1. Fork the repository.
