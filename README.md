# Nursery System REST API

## Project Description:

- The Nursery System REST API is backend API built with Node.js, Express.js, Mongoose, MongoDB, Multer, Bcrypt, and JWT. This API provides a secure and scalable solution for managing a nursery system.

- It uses `Mongoose` for object modeling, allowing for easy integration with other databases.

- Avatars of teachers can be uploaded using `Multer`, and stored in` MongoDB`.

## Installation
To get started with the Nursery System REST API, follow these steps:
1. Clone the repository to your local machine. `git clone <Repo Link>`
2. Install the required dependencies by running `npm install`.
3. Create a `.env` file in the root directory of the project and set the following environment variables: 
    ```bash
    port = 8081
    DatabaseUrl = <your_database_uri>
    secretKey = <your_database_uri>
    ```
4. Start the server by running 
    ```bash 
    npm start
    ```

## Endpoints

### Child Endpoints

- `GET /child`: Retrieve a list of all children.
- `GET /child/:id`: Retrieve a specific child record by ID.
- `GET /child/:id/class`: Retrive the class of a specific child by its ID.
- `POST /child`: Create a new child record.
- `PATCH /child/:id`: Update a specific child record by ID.
- `DELETE /child/:id`: Delete a specific child record by ID.

### Class Endpoints

- `GET /class`: Retrieve a list of all classes.
- `GET /class/:id`: Retrieve a specific class record by ID.
- `GET /class/:id/teacher`: Retrieve the supervisor of a specific class by its ID.
- `GET /class/:id/child`: Retrieve a list of all children in a specific class by its ID.
- `POST /class`: Create a new class record.
- `PATCH /class/:id`: a specific class record by ID.
- `DELETE /class/:id`: Delete a specific class by ID.

### Teacher Endpoints

- `GET /teacher`: Retrieve a list of all teachers.
- `GET /teacher/:id`: Retrieve a specific teacher record by ID.
- `GET /teacher/supervisors`: Retrieve a list of all teachers that are supervisors.
- `PATCH /teacher/:id`: Update a specific teacher by ID.
- `DELETE /teacher/:id`: Delete a specific teacher by ID.

### Register Endpoint

- `POST /register`: Register a new teacher in the system.

### Login Endpoint

- `POST /login`: Login a teacher and receive an access token.

> **Note:** All endpoints except for `POST /register` and `POST /login` require an access token in the Authorization header. The token can be obtained by logging in a teacher via `/login` endpoint.

### Authentication and Authorization

- JSON Web Tokens (JWT) is used for authentication. Teachers can register, login, and receive an access token to access the protected endpoints.
- All endpoints have a validation middleware using Express validator.
- Passwords are encrypted with bcrypt.
- The admin account has full access to all endpoints and other teachers can only see the data of its own and the class it supervises.

## Conclusion

This nursery system REST provides a robust set of endpoints for managing information about child, classes, and teachers. The includes authentication and authorization features to ensure that only authorized users can access certain endpoints. It's a great starting point for building a larger nursery management system.