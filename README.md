# Authentication API Documentation

This API provides authentication functionalities, including user registration, login, and access to protected resources. Below is the detailed documentation for the available endpoints and related services.

## Prerequisites
- Node.js and npm installed.
- A configured Sequelize setup connected to your database.
- Environment variables for `JWT_SECRET`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and `DB_HOST`.

## Models

### User
| Field    | Type    | Description                   |
|----------|---------|-------------------------------|
| id       | Integer | Primary key (auto-increment)  |
| name     | String  | Full name of the user         |
| email    | String  | Unique email address          |
| password | String  | Hashed password               |

### Token Generation
- **Payload:** `{ id: user.id, email: user.email }`
- **Secret:** Environment variable `JWT_SECRET`
- **Expiration:** `1 hour`

## API Endpoints

### 1. User Registration
**Endpoint:** `POST /register`

**Description:** Registers a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**
- **201 Created:** User registered successfully.
  ```json
  {
    "message": "User registered successfully"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "error": "User already exists"
  }
  ```

### 2. User Login
**Endpoint:** `POST /login`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**
- **200 OK:** Login successful.
  ```json
  {
    "message": "Login successful",
    "token": "<JWT_TOKEN>"
  }
  ```
- **400 Bad Request:** Invalid credentials.
  ```json
  {
    "error": "User not found" or "Invalid password"
  }
  ```

### 3. Protected Route
**Endpoint:** `GET /protected`

**Description:** Access a protected resource. Requires a valid JWT token.

**Headers:**
- `Authorization: Bearer <JWT_TOKEN>`

**Response:**
- **200 OK:** Access granted.
  ```json
  {
    "message": "Protected route accessed",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com"
    },
    "token": "<JWT_TOKEN>"
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "error": "Unauthorized access"
  }
  ```

## Middleware

### Authentication Middleware
The `authMiddleware` validates the JWT token and authorizes the user.

**Process:**
1. Check for `Authorization` header.
2. Verify token using `JWT_SECRET`.
3. Fetch user details from the database.
4. Attach `user` and `authToken` to `req` object.

**Error Handling:** Returns `401 Unauthorized` if the token is missing, invalid, or the user is not found.

## Services

### User Registration Service
- **Function:** `registerUser`
- **Logic:**
  1. Check if the user already exists.
  2. Hash the password using `bcryptjs`.
  3. Save the user in the database.

### User Login Service
- **Function:** `loginUser`
- **Logic:**
  1. Find the user by email.
  2. Validate the password using `bcryptjs.compare`.
  3. Generate and return a JWT token.

### JWT Service
- **Function:** `generateToken`
- **Description:** Generates a signed JWT token with a 1-hour expiration.

## Example Usage

### User Registration:
```bash
curl -X POST http://localhost:3000/register \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "johndoe@example.com", "password": "password123"}'
```

### User Login:
```bash
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"email": "johndoe@example.com", "password": "password123"}'
```

### Access Protected Route:
```bash
curl -X GET http://localhost:3000/protected \
-H "Authorization: Bearer <JWT_TOKEN>"
```

## Error Handling
All endpoints return appropriate HTTP status codes and error messages. Ensure to handle these errors on the client side.

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.


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
