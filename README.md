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
# API Documentation for Ticket Booking

## Overview
This document provides details about the Ticket Booking API, which allows users to book seats, retrieve booked seats, and reset their bookings.

---

## Endpoints

### 1. Book Seat

**Endpoint:** `/api/seat/seatBook`  
**Method:** `POST`  
**Middleware:** `authMiddleware`  
**Description:** Allows a user to book one or more seats.

**Request Headers:**
- `Authorization`: Bearer token for authentication.

**Request Body:**
```json
{
    "bookedSeats": [1, 2, 3]  // Array of seat numbers to book
}
```

**Responses:**
- **200 OK:** Seats successfully booked or updated.
```json
{
    "message": "Seats 1, 2, 3 successfully booked for user ID 123.",
    "seat": {
        "id": 1,
        "bookedSeats": [1, 2, 3],
        "userId": 123
    }
}
```
- **400 Bad Request:** Invalid input.
```json
{
    "message": "Invalid input: bookedSeats must be an array."
}
```
- **500 Internal Server Error:**
```json
{
    "message": "Internal Server Error",
    "error": "Error details"
}
```

---

### 2. Get Booked Seats

**Endpoint:** `/api/seat/seatBook`  
**Method:** `GET`  
**Middleware:** `authMiddleware`  
**Description:** Retrieves all booked seats for the authenticated user.

**Request Headers:**
- `Authorization`: Bearer token for authentication.

**Responses:**
- **200 OK:** Successfully retrieved booked seats.
```json
{
    "message": "Seats retrieved successfully for user ID 123.",
    "seat": {
        "id": 1,
        "bookedSeats": [1, 2, 3],
        "userId": 123
    }
}
```
- **404 Not Found:** No seats found for the user.
```json
{
    "message": "No seats found for user ID 123."
}
```
- **500 Internal Server Error:**
```json
{
    "message": "Internal Server Error",
    "error": "Error details"
}
```

---

### 3. Reset Booked Seats

**Endpoint:** `/api/seat/bookedSeatReset`  
**Method:** `POST`  
**Middleware:** `authMiddleware`  
**Description:** Resets all booked seats for the authenticated user.

**Request Headers:**
- `Authorization`: Bearer token for authentication.

**Responses:**
- **200 OK:** Successfully reset booked seats.
```json
{
    "message": "All bookings have been reset for user ID 123.",
    "seat": {
        "id": 1,
        "bookedSeats": [],
        "userId": 123
    }
}
```
- **404 Not Found:** No bookings found to reset.
```json
{
    "message": "No bookings found for user ID 123."
}
```
- **500 Internal Server Error:**
```json
{
    "message": "Internal Server Error",
    "error": "Error details"
}
```

---

## Models

### Seat Model
Represents the `Seat` entity in the database.

**Attributes:**
- `id` (Integer): Primary key.
- `bookedSeats` (Array of Integers): List of booked seat numbers.
- `userId` (Integer): Unique identifier for the user.

---

## Middleware

### `authMiddleware`
Ensures that the user is authenticated before accessing protected routes.

**Functionality:**
1. Verifies the presence and validity of the `Authorization` token in the request headers.
2. Decodes the token to fetch user details.
3. Attaches the authenticated user object to the `req` object.
4. Returns a `401 Unauthorized` response if authentication fails.

---

## Controllers

### `bookSeat`
Books one or more seats for the authenticated user. If the user has existing bookings, the new seats are merged with the existing ones.

### `getSeats`
Fetches the booked seats for the authenticated user. Returns a `404 Not Found` response if no bookings exist.

### `resetSeats`
Resets all booked seats for the authenticated user. Returns a `404 Not Found` response if no bookings exist.

---

## Database Setup

### Seat Table
**Schema:**
- `id`: Auto-incrementing integer (Primary Key).
- `bookedSeats`: Array of integers.
- `userId`: Integer (Unique).

---

## Notes
- Ensure the `authMiddleware` is properly configured with valid JWT handling.
- The `bookedSeats` field is designed for PostgreSQL. For other databases, adjustments might be required.


