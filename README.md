# Authentication API Documentation

This document provides details about the Authentication API implemented using Node.js, Express, Sequelize, Passport.js, and JWT.

---

## **Setup**
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Set up a `.env` file with the following variables:
   ```env
   JWT_SECRET=your_secret_key
   DATABASE_URL=your_database_url
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   ```
3. Run the application:
   ```bash
   npm start
   ```

---

## **Database Setup**

### **Configuration**
The database is configured using Sequelize and PostgreSQL.

```javascript
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Adjusts tables to match the models
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

syncDatabase();

module.exports = sequelize;
```

### **Notes**
- The `syncDatabase` function ensures that the database schema is in sync with the Sequelize models.
- Use `alter: true` cautiously in production as it modifies existing tables.
- Ensure database credentials are stored securely in the `.env` file.

---

## **API Endpoints**

### **Base URL**
`/api/auth`

### **Endpoints**

#### **1. Register User**
- **URL**: `/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "User registered successfully"
    }
    ```
  - **Error**:
    ```json
    {
      "error": "User already exists"
    }
    ```

#### **2. Login User**
- **URL**: `/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Login successful",
      "token": "jwt_token"
    }
    ```
  - **Error**:
    ```json
    {
      "error": "Invalid password"
    }
    ```

#### **3. Protected Route**
- **URL**: `/protected`
- **Method**: `GET`
- **Description**: Accesses a protected route.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "message": "Protected route accessed",
      "user": { "id": "number", "email": "string", ... },
      "token": "jwt_token"
    }
    ```
  - **Error**:
    ```json
    {
      "error": "Unauthorized"
    }
    ```

---

## **Middleware**

### **authMiddleware**
- Validates the JWT token provided in the `Authorization` header.
- Decodes the token and attaches the authenticated user and token to the request object.
- Returns a `401 Unauthorized` response if the token is invalid or missing.

---

## **Models**

### **User**
Defines the user schema with Sequelize.
- **Fields**:
  - `id`: Primary key (auto-incremented integer)
  - `name`: String, required
  - `email`: String, required, unique
  - `password`: String, required (hashed)
  - `googleId`: String, optional
  - `profilePic`: String, optional
  - `fieldName`: String, default random value
- **Methods**:
  - `isPasswordValid(password)`: Compares the provided password with the stored hashed password.

---

## **Services**

### **registerUser**
- Registers a new user by hashing the password and storing the user data in the database.
- Throws an error if the email already exists.

### **loginUser**
- Authenticates a user by validating the email and password.
- Generates a JWT token for the authenticated user.

---

## **Utilities**

### **JWT Service**
- **generateToken(user)**: Creates a JWT token with user details.
- **verifyToken(token)**: Verifies and decodes a JWT token.

---

## **Error Handling**
- Validation errors, such as missing fields or invalid inputs, return a `400 Bad Request` status with an error message.
- Authentication errors, such as invalid or missing tokens, return a `401 Unauthorized` status with an error message.

---

## **Notes**
- Ensure that `JWT_SECRET` is securely stored and not hardcoded in the application.
- Use HTTPS in production to secure token transmission.
- Use rate-limiting and monitoring for enhanced security.



=============================================================================================================================
# API Documentation for Seat Ticket Booking API

This API enables users to book, retrieve, and reset seat bookings for a ticketing system. The following documentation outlines the API endpoints, their functionalities, and examples.

## Prerequisites
- Node.js and npm installed.
- A configured Sequelize setup connected to your database.
- Authentication middleware to protect the endpoints.

## Models

### Seat
| Field  | Type     | Description                 |
|--------|----------|-----------------------------|
| id     | Integer  | Primary key (auto-increment) |
| number | Integer  | Unique seat number          |

### Booking
| Field  | Type     | Description                 |
|--------|----------|-----------------------------|
| id     | Integer  | Primary key (auto-increment) |
| userId | Integer  | ID of the user booking the seat |
| seatId | Integer  | ID of the booked seat       |

## API Endpoints

### 1. Book Seats
**Endpoint:** `POST /seatBook`

**Description:** Allows a user to book one or more seats.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "bookedSeats": [1, 2, 3]
}
```

**Response:**
- **201 Created:** Seats booked successfully.
  ```json
  {
    "message": "Seats booked successfully."
  }
  ```
- **400 Bad Request:** Invalid input.
  ```json
  {
    "message": "Invalid input: bookedSeats must be an array."
  }
  ```
- **500 Internal Server Error:** Error during the booking process.

### 2. Get Booked Seats
**Endpoint:** `GET /seatBook`

**Description:** Retrieves all booked seats.

**Headers:**
- `Authorization: Bearer <token>`

**Response:**
- **200 OK:** List of booked seats.
  ```json
  {
    "bookedSeats": [1, 2, 3]
  }
  ```
- **500 Internal Server Error:** Error fetching booked seats.

### 3. Reset Seats
**Endpoint:** `POST /bookedSeatReset`

**Description:** Resets all seat bookings and clears the data.

**Headers:**
- `Authorization: Bearer <token>`

**Response:**
- **200 OK:** All bookings and seats reset successfully.
  ```json
  {
    "message": "All bookings and seats have been reset successfully."
  }
  ```
- **500 Internal Server Error:** Error during the reset process.

## Database Setup
Ensure the database tables are configured with Sequelize models:
- `Seat` model for seat information.
- `Booking` model for tracking seat bookings by users.

## Middleware
The `authMiddleware` is used to validate and authorize API requests. Ensure it is properly configured to handle user authentication.

## Example Usage
### Booking Seats:
```bash
curl -X POST http://localhost:3000/seatBook \
-H "Authorization: Bearer <token>" \
-H "Content-Type: application/json" \
-d '{"bookedSeats": [1, 2, 3]}'
```

### Retrieving Booked Seats:
```bash
curl -X GET http://localhost:3000/seatBook \
-H "Authorization: Bearer <token>"
```

### Resetting Bookings:
```bash
curl -X POST http://localhost:3000/bookedSeatReset \
-H "Authorization: Bearer <token>"
```

## Error Handling
All endpoints return appropriate HTTP status codes and error messages in case of failures. Ensure to handle these errors in your client-side application.

## License
This project is licensed under the MIT License. Feel free to use and modify it for your needs.
