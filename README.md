# MVBLOG

## Description

**MVBlog** is a robust blog management application designed to handle user authentication and blog post management. The platform allows users to register, log in, create, and manage their blog posts with support for file uploads. It leverages modern technologies such as JWT for secure authentication, bcrypt for password hashing, and PostgreSQL for efficient data storage.

## Features

- User Registration and Login
- JWT-Based Authentication
- Create, Read, Update, and Delete (CRUD) Operations for Blog Posts
- File Uploads for Blog Posts
- View All Posts and Manage User-Specific Posts

## Tech Stack

- **Node.js** with **Express**: Backend server and API handling.
- **PostgreSQL**: Database for storing user and blog post data.
- **Bcrypt**: For secure password hashing.
- **JWT**: For managing authentication tokens.
- **Multer**: Middleware for handling file uploads.
- **Cors**: Middleware for Cross-Origin Resource Sharing.
- **dotenv**: For managing environment variables.
- **Cookie-Parser**: For handling cookies.

## Topics 

   - Node.js: The runtime environment used for the server-side code.
   - Express: The web framework used to build the API.
   - PostgreSQL: The database system used to store data.
   - JWT: JSON Web Tokens used for authentication.
   - bcrypt: Library used for hashing passwords.
   - Multer: Middleware for handling file uploads.
   - File Uploads: Feature of the application to handle image and file uploads.
   - Web Application: A general term for applications accessed via web browsers.
   - API: Application Programming Interface, a crucial part of the project.
   - Authentication: The process of verifying user identity.
   - Blog: The primary functionality of the project.
   - Full Stack: The project involves both frontend and backend components.
   - Open Source: Indicates that the project is open for public contributions.
   - JavaScript: The programming language used.
   - Backend: Refers to the server-side part of the application.
   - CRUD: Create, Read, Update, Delete operations.
   - REST API: Representational State Transfer API, a common architectural style for web services.
   - Middleware: Functions that execute during the request-response cycle.
   - Cors: Middleware for enabling Cross-Origin Resource Sharing.
   - Dotenv: Library for managing environment variables.

## Installation

### Prerequisites

- Node.js and npm should be installed.
- PostgreSQL should be installed and running.

### Steps to Install

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Manish312002/MVBLOG.git
   cd MVBLOG

2. **Install Dependencies:**
   - Install the necessary npm packages:

    ```bash
    cd client
    npm i

    cd server
    npm i

3. **Setup Environment Variables:**
   - Create a .env file in the root directory of the project and add the following environment variables:

   ```bash
    SECRET=your_jwt_secret
    PG_USER=your_postgres_user
    PG_HOST=localhost
    PG_DATABASE=your_postgres_database
    PG_PASSWORD=your_postgres_password
    PG_PORT=5432
   
  - Replace the placeholder values with your actual configuration details.

4. **Run the Server:**
   - Start the server:

     ```bash
     cd client
     npm run dev

     cd server
     nodemon server.js


## API Endpoints

### Authentication

- **POST /register**

  Registers a new user.

  - **Request Body:**
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    - **Success:**
      ```json
      {
        "message": "User has been registered"
      }
      ```
    - **Error:**
      ```json
      {
        "message": "Username already exists!" // or other error messages
      }
      ```

 
- **POST /login**

  Logs in a user and returns a JWT token.

  - **Request Body:**
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response:**
    - **Success:**
      ```json
      {
        "id": "number",
        "username": "string"
      }
      ```
    - **Error:**
      ```json
      {
        "message": "Incorrect password" // or "User not found, Try again!"
      }
      ```
  
- **GET /profile**

  Retrieves the profile information of the logged-in user (requires authentication).

  - **Headers:**
    - **Cookie:** `token=<jwt_token>`
  - **Response:**
    - **Success:**
      ```json
      {
        "username": "string",
        "id": "number"
      }
      ```
    - **Error:**
      ```json
      {
        "message": "No token provided" // or "Invalid token"
      }
      ```

- **POST /logout**

  Logs out the current user by clearing the JWT token.

  - **Response:**
    - **Success:**
      ```json
      {
        "message": "Logout"
      }
      ```

### Blog Posts

- **POST /create_post**

  Creates a new blog post (requires authentication).

  - **Request Body:**
    ```json
    {
      "title": "string",
      "contentType": "string",
      "summary": "string",
      "content": "string"
    }
    ```
  - **File Upload:**
    - **File:** `file` (optional)
  - **Headers:**
    - **Cookie:** `token=<jwt_token>`
  - **Response:**
    - **Success:**
      ```json
      {
        "message": "Success"
      }
      ```
    - **Error:**
      ```json
      {
        "message": "Error message here" // Specific error message
      }
      ```

- **GET /posts**

  Retrieves a list of blog posts, sorted randomly and limited to 20.

  - **Response:**
    - **Success:**
      ```json
      [
        {
          "id": "number",
          "title": "string",
          "contentType": "string",
          "summary": "string",
          "author": "string",
          "content": "string",
          "filepath": "string"
        }
      ]
      ```

- **GET /my_Posts**

  Retrieves blog posts created by the logged-in user (requires authentication).

  - **Headers:**
    - **Cookie:** `token=<jwt_token>`
  - **Response:**
    - **Success:**
      ```json
      [
        {
          "id": "number",
          "title": "string",
          "contentType": "string",
          "summary": "string",
          "author": "string",
          "content": "string",
          "filepath": "string"
        }
      ]
      ```
    - **Error:**
      ```json
      {
        "message": "No token provided" // or "Invalid token"
      }
      ```

- **GET /delete/:id**

  Deletes a blog post by ID (requires authentication).

  - **Parameters:**
    - **Path Parameter:** `id` (Post ID)
  - **Headers:**
    - **Cookie:** `token=<jwt_token>`
  - **Response:**
    - **Success:**
      ```json
      {
        "message": "Post {id} deleted"
      }
      ```
    - **Error:**
      ```json
      {
        "message": "Error message here" // Specific error message
      }
      ```

- **GET /post/:id**

  Retrieves a single blog post by ID.

  - **Parameters:**
    - **Path Parameter:** `id` (Post ID)
  - **Response:**
    - **Success:**
      ```json
      {
        "id": "number",
        "title": "string",
        "contentType": "string",
        "summary": "string",
        "author": "string",
        "content": "string",
        "filepath": "string"
      }
      ```
    - **Error:**
      ```json
      {
        "message": "Failed to get post" // or other error messages
      }
      ```

- **GET /edit/:id**

  Retrieves the details of a blog post for editing by ID.

  - **Parameters:**
    - **Path Parameter:** `id` (Post ID)
  - **Response:**
    - **Success:**
      ```json
      {
        "id": "number",
        "title": "string",
        "contentType": "string",
        "summary": "string",
        "author": "string",
        "content": "string",
        "filepath": "string"
      }
      ```
    - **Error:**
      ```json
      {
        "message": "Failed to get post" // or other error messages
      }
      ```

- **POST /edit/:id**

  Edits an existing blog post by ID (requires authentication).

  - **Request Body:**
    ```json
    {
      "title": "string",
      "contentType": "string",
      "summary": "string",
      "content": "string"
    }
    ```
  - **File Upload:**
    - **File:** `file` (optional)
  - **Parameters:**
    - **Path Parameter:** `id` (Post ID)
  - **Headers:**
    - **Cookie:** `token=<jwt_token>`
  - **Response:**
    - **Success:**
      ```json
      {
        "message": "Success"
      }
      ```
    - **Error:**
      ```json
      {
        "message": "Failed to Update post" // or other error messages
      }
      ```

## Contributing

   - We welcome contributions to BlogMaster! To contribute:
      - Fork the repository.
      - Create a new branch (git checkout -b feature-branch).
      - Make your changes.
      - Commit your changes (git commit -am 'Add new feature').
      - Push to the branch (git push origin feature-branch).
      - Open a pull request.
