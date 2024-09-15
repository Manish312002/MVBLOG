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

     
