# Easy-Shop-API

## Description

This API provides a basic e-commerce platform, allowing users to manage products and user accounts. It includes features for user registration, email verification, product listing, and authentication.

## Features and Functionality

*   **User Management:**
    *   User registration with email verification using OTP (One-Time Password).
    *   Resend OTP functionality.
    *   User login with JWT (JSON Web Token) authentication.
    *   User profile update (requires authentication).
    *   User Roles (Admin/User) with authorization middleware
*   **Product Management:**
    *   List all products.
    *   Get product by ID.
    *   Create a product (requires authentication).
    *   Update a product.
    *   Delete a product.

## Technology Stack

*   Node.js
*   Express.js
*   Prisma (ORM)
*   bcrypt (Password hashing)
*   jsonwebtoken (JWT)
*   nodemailer (Email sending)
*   dotenv (Environment variables)
*   express-validator (Request validation)
*   date-fns (Date manipulation)

## Prerequisites

*   Node.js (v16 or higher)
*   npm or yarn
*   PostgreSQL database
*   Gmail account for sending emails (or other SMTP service)

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/RUYANGA/Easy-Shop-API.git
    cd Easy-Shop-API
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```
    DATABASE_URL="postgresql://user:password@host:port/database?schema=public" # Your PostgreSQL database URL
    EMAIL="your-email@gmail.com" # Your Gmail email address
    EMAIL_PASS="your-email-password" # Your Gmail password or App Password (recommended)
    JWTKEY="your-secret-jwt-key" # Replace with a strong, random key
    ```

    **Important:** For Gmail, it's recommended to use an App Password instead of your regular password for security reasons.  Enable "Less secure app access" in your Google account settings if you're not using App Passwords (not recommended for production).

4.  **Set up the Prisma schema:**

    Edit the `schema.prisma` file to match your database schema requirements.  This file isn't directly provided in the source, but Prisma uses a `schema.prisma` file for database configuration.

5.  **Generate Prisma Client:**

    ```bash
    npx prisma generate
    ```

6.  **Run database migrations:**

    ```bash
    npx prisma migrate dev --name init # or any descriptive name for your initial migration
    ```

7.  **Start the server:**

    ```bash
    npm run dev # Uses nodemon to automatically restart the server upon file changes. Add this command to your `package.json` file.
    # or
    node src/main.ts #for production
    ```

    The server will start on port 3000 (or the port specified in your `.env` file).

## Usage Guide

### User Registration

*   **Endpoint:** `POST /user/create`
*   **Body:**

    ```json
    {
        "username": "your_username",
        "email": "your_email@example.com",
        "password": "your_password"
    }
    ```

*   **Response:**  `200 OK` with a message indicating successful signup and instructions to verify the OTP sent to the provided email.

### Verify OTP

*   **Endpoint:** `POST /user/verify`
*   **Body:**

    ```json
    {
        "email": "your_email@example.com",
        "otp": "123456" // The OTP received in the email
    }
    ```

*   **Response:** `200 OK` with a message confirming email verification.

### Resend OTP

*   **Endpoint:** `POST /user/resendotp`
*   **Body:**

    ```json
    {
        "email": "your_email@example.com"
    }
    ```

*   **Response:** `201 OK` with a message indicating that a new OTP has been sent to the provided email.

### Login

*   **Endpoint:** `POST /user/login`
*   **Body:**

    ```json
    {
        "email": "your_email@example.com",
        "password": "your_password"
    }
    ```

*   **Response:** `200 OK` with a JWT token in the `token` field.  This token is required for accessing protected routes.

### Dashboard (Requires Authentication)

*   **Endpoint:** `GET /user/dashboard`
*   **Headers:** `Authorization: Bearer <your_jwt_token>`  (Replace `<your_jwt_token>` with the actual JWT token obtained after login.)
*   **Role Required:** `ADMIN`

*   **Response:** `200 OK` with user data, including associated products.

### Update User (Requires Authentication)

*   **Endpoint:** `PUT /user/updates`
*   **Headers:** `Authorization: Bearer <your_jwt_token>`
*   **Body:**

    ```json
    {
        "username": "new_username",
        "email": "new_email@example.com",
        "password": "new_password" // Optional: Only include if you want to change the password
    }
    ```

*   **Role Required:** `USER` or `ADMIN`
*   **Response:** `201 OK` with a success message.

### List Products

*   **Endpoint:** `GET /`
*   **Response:** `200 OK` with a list of products.

### Get Product by ID

*   **Endpoint:** `GET /product/:id` (Replace `:id` with the actual product ID)
*   **Response:** `200 OK` with the product details.

### Create Product (Requires Authentication)

*   **Endpoint:** `POST /product/create/:id` (Replace `:id` with the user ID of the product creator.)
*   **Headers:**  None (authentication is not explicitly enforced in the provided code for this endpoint)
*   **Body:**

    ```json
    {
        "name": "Product Name",
        "price": 99.99,
        "decription": "Product description"
    }
    ```

*   **Response:** `201 OK` with a success message and the created product details.

### Update Product

*   **Endpoint:** `PUT /product/:id` (Replace `:id` with the actual product ID)
*   **Response:** `200 OK` with an "Update products" message.  (The actual update logic is missing.)

### Delete Product

*   **Endpoint:** `DELETE /product/:id` (Replace `:id` with the actual product ID)
*   **Response:** `200 OK` with a "Product deleted" message.

## API Documentation

| Endpoint               | Method | Description                                   | Request Body                                                                          | Response Body                                                                                   | Authentication Required |
| ---------------------- | ------ | --------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------- |
| `/user/create`        | POST   | Registers a new user                          | `username`, `email`, `password`                                                     | Success message, OTP verification instructions                                                    | No                      |
| `/user/verify`         | POST   | Verifies the OTP sent to the user's email      | `email`, `otp`                                                                        | Success message, indicates email verified                                                         | No                      |
| `/user/resendotp`      | POST   | Resends the OTP to the user's email           | `email`                                                                               | Success message, indicates new OTP sent                                                          | No                      |
| `/user/login`         | POST   | Logs in an existing user                       | `email`, `password`                                                                   | Success message, JWT token                                                                      | No                      |
| `/user/dashboard`      | GET    | Retrieves user dashboard information         | None                                                                                  | User data, including associated products                                                        | Yes (ADMIN Role)       |
| `/user/updates`       | PUT    | Updates user profile information              | `username`, `email`, `password` (optional)                                          | Success message                                                                                 | Yes (USER/ADMIN Role)  |
| `/`                   | GET    | Lists all products                            | None                                                                                  | List of products                                                                                | No                      |
| `/product/:id`        | GET    | Retrieves a specific product by ID            | None                                                                                  | Product details                                                                                 | No                      |
| `/product/create/:id`  | POST   | Creates a new product (associated with a user) | `name`, `price`, `decription`                                                         | Success message, created product details                                                          | No                      |
| `/product/:id`        | PUT    | Updates a specific product by ID            | None                                                                                  | Message : Update products (Update logic is not implemented) | No                      |
| `/product/:id`        | DELETE | Deletes a specific product by ID              | None                                                                                  | Success message                                                                                 | No                      |

## Contributing Guidelines

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Write tests for your changes.
5.  Submit a pull request.

## License Information

No license is specified in the repository. All rights are reserved unless otherwise specified.

## Contact/Support Information

*   GitHub: [https://github.com/RUYANGA](https://github.com/RUYANGA)
*   Twitter: [https://x.com/RuyangaM](https://x.com/RuyangaM)
*   Facebook: [https://www.facebook.com/ruyanga.merci.1](https://www.facebook.com/ruyanga.merci.1)