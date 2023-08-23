# User Management System API

This API endpoint is essential for applications that require user authentication, registration, profile management, and authorization. This API boosts a good security protocol of securing user's details through Hashing. Here's a detailed description of a User Management System API:
## Table of Contents

- [User Management System API](#user-management-system-api)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Authentication](#authentication)
  - [User Endpoints](#user-endpoints)
    - [Create User](#create-user)
    - [User Login:](#user-login)
    - [User Dashboard:](#user-dashboard)
    - [User Logout:](#user-logout)
  - [Error Handling](#error-handling)
  - [Contributing](#contributing)
  - [License](#license)
  - [This project is licensed under the MIT License.](#this-project-is-licensed-under-the-mit-license)

## Getting Started

To use the User Management System API, follow these steps:

1. Clone this repository: `git clone https://github.com/your-username/user-management-api.git`
2. Install dependencies: `npm install`
3. Set up your environment variables:
   - `PORT`: Port number for the server
   - `MONGODB_URI`: MongoDB connection URI
   - `JWT_SECRET`: Secret key for JWT
   - ...
4. Start the server: `npm start`

## Authentication

This API uses JSON Web Tokens (JWT) for authentication. To authenticate, include the token in the request cookies as a unique identifier linking the user to a server-side record of their credentials after its has been verified.

## User Endpoints

### Create User
- **Endpoint**: `POST /api/v1/ums/register`
- **Request Body**:

```json
{
  "username": "exampleuser",
  "password": "P@ssword123"
}
```

- **Response**:
```json
{
    "msg": "Account successfully created.",
    "userDetails": {
        "username": "username",
        "_id": "user-id",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
}
```

### User Login:
   - **Endpoint:** `/api/v1/ums/login`
   - **Description:** Allows users to log in using their credentials and receive an access token embedded in a cookie for authenticated requests.
   - **Request Method:** POST
   - **Request Body:**
     ```json
     {
       "username": "user123",
       "password": "sfdlk@dkfiW-i30%4fifiSHD"
     }
     ```
   - **Response:**
     - 200 OK: Successfully logged in. Returns an access token and redirects to URL.
     - 401 Unauthorized: Invalid credentials.

### User Dashboard:
   - **Endpoint:** `/api/v1/ums/dashboard`
   - **Description:** Return a welcome message with the user's information [Username].
   - **Request Method:** GET
   - **Cookies:** Cookie name and Token (Access Token)
   - **Response:**
     - 200 OK: Returns user information.
     - 401 Unauthorized: Missing or invalid access token.

### User Logout:
   - **Endpoint:** `/api/v1/ums/logout`
   - **Description:** Allows users to completely log out of a user account clearing their unique token from the browser storage.
   - **Request Method:** GET
   - **Cookies:** unique name and Token (Access Token).
   - **Response:**
     - 200 OK: User logout successfully.
  
## Error Handling

- **400 Bad Request**: Invalid request data or parameters.
- **401 Unauthorized**: Missing or invalid authentication token.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: Server-side errors.

## Contributing

Contributions are welcome! If you have suggestions or find issues, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
---

This is just an overview of what a User Management System API might include. Depending on the complexity of your application, you can expand and customize these endpoints to meet your specific requirements, including features like role-based access control, password recovery, email verification, and more.