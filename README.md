# RESTful API with User Authentication

This API endpoint is essential for applications that require user authentication, registration, and authorization, Permission to secured route, update and delete of user account. This API boosts a good security protocol of securing user's details through Hashing and validate the user password[Alphanumeric]. Here's a detailed description of a User Management System API:

## Table of Contents

- [RESTful API with User Authentication](#restful-api-with-user-authentication)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Authentication](#authentication)
  - [User Endpoints](#user-endpoints)
    - [Create User](#create-user)
    - [User Login:](#user-login)
    - [User Dashboard:](#user-dashboard)
    - [Users List:](#users-list)
    - [User Details:](#user-details)
    - [Current user Details:](#current-user-details)
    - [Update user password:](#update-user-password)
    - [Delete user account:](#delete-user-account)
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
- **Description**: The credentials needed are the username, password, and role which can only be either 'user' or 'Admin' with the role set to deafault: 'user'.
- **Request Body**:

```json
{
  "username": "exampleuser",
  "password": "P@ssword123",
  "role": "admin"
}
```

- **Response**:
```json
{
    "msg": "Account successfully created.",
    "userDetails": {
        "username": "username",
        "_id": "user-id",
        "role": "admin",
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
       "password": "P@ssw0rd"
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

### Users List:
   - **Endpoint:** `/api/v1/ums/dashboard/getall`
   - **Description:** Return a the list of all the registered User with the role 'user' details.
   - **Request Method:** GET
   - **Cookies:** Cookie name and Token (Access Token);
   - **Response:**
     - 200 OK: Returns list of all user information with password.
     - 401 Unauthorized: Missing or invalid access token.

### User Details:
   - **Endpoint:** `/api/v1/ums/dashboard/:id`
   - **Description:** Return the details of the requested registered User with the role: 'user'.
   - **Request Method:** GET
   - **Cookies:** Cookie name and Token (Access Token);
   - **Response:**
     - 200 OK: Returns list of requested user information with password.
     - 401 Unauthorized: Missing or invalid access token.
     - 403 Forbidden: You can not view a fellow admin details.

### Current user Details:
   - **Endpoint:** `/api/v1/ums/dashboard/showme`
   - **Description:** Return the details of the current log in user with the role: 'user'.
   - **Request Method:** GET
   - **Cookies:** Cookie name and Token (Access Token);
   - **Response:**
     - 200 OK: Returns details of current log in user information with password.
     - 401: Unauthorized: Missing or invalid access token.

### Update user password:
   - **Endpoint:** `/api/v1/ums/dashboard/`
   - **Description:** Return the details of the current log in user with the role: 'user'.
   - **Request Method:** PATCH
   - **Cookies:** Cookie name and Token (Access Token);
   - **Request Body:**
     ```json
     {
      "oldPassword": "P@ssw0rd",
      "newPassword": "P@ssw0rd123"
    }
     ```
   - **Response:**
     - 200 OK: "Success! Password Updated".
     - 401: Unauthorized: Missing or invalid access token.

### Delete user account:
   - **Endpoint:** `/api/v1/ums/dashboard/`
   - **Description:** Delete the details of user with the id matching the requested credentials of the user with the role: 'user'.
   - **Request Method:** DELETE
   - **Cookies:** Cookie name and Token (Access Token);
   - **Request Body:**
     ```json
     {
      "userID": "user-id"
      }
     ```
   - **Response:**
     - 200 OK: "user deleted successfully".
     - 401: Unauthorized: Missing or invalid access token.
     - 403: FORBIDDEN: "You can not delete a fellow admin account"


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