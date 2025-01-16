# API Endpoints Documentation

## Authentication Service

The `authService` handles all user authentication and account management functionalities.

### 1. Authenticate User

**Endpoint:** `POST ${authApi}/user/authenticate`

**Description:** This endpoint is used to authenticate a user with their credentials.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Example Response:**

```json
{
  "id": "number",
  "username": "string",
  "token": "string"
}
```

**Response:**

- **200 OK**: Returns a token on successful authentication.
- **401 Unauthorized**: Invalid credentials.

---

### 2. Register User

**Endpoint:** `POST ${authApi}/user/register`

**Description:** This endpoint is used to register a new user.

**Request Body:**

```json
{
  "username": "string",
  "fullname": "string",
  "email": "string",
  "birthdate": "string (ISO format)",
  "occupation": "string",
  "monthlyIncome": "number | null",
  "existingCredit": "boolean",
  "existingCreditAmount": "number | null",
  "monthlyInstallment": "boolean",
  "monthlyInstallmentAmount": "number | null",
  "password": "string"
}
```

**Response:**

- **201 Created**: User registered successfully.
- **400 Bad Request**: Missing or invalid input.
- **500 Internal Server Error**: Server error occurred while registering user.

---

### 3. Delete User Account

**Endpoint:** `DELETE ${authApi}/user/:id`

**Description:** This endpoint deletes the authenticated user's account.

**Response:**

- **200 OK**: Account deleted successfully.
- **401 Unauthorized**: User not authenticated.

---

## User Service

The `userService` handles user profile management.

### 1. Get User by ID

**Endpoint:** `GET ${userService}/user/:id`

**Description:** Fetches details of a specific user by ID.

**Example Response:**

```json
{
  "username": "string",
  "fullname": "string",
  "email": "string",
  "birthdate": "string (ISO format)",
  "occupation": "string",
  "monthlyIncome": "number | null",
  "existingCredit": "boolean",
  "existingCreditAmount": "number | null",
  "monthlyInstallment": "boolean",
  "monthlyInstallmentAmount": "number | null"
}
```

**Response:**

- **200 OK**: Returns user details.
- **404 Not Found**: User not found.
- **500 Internal Server Error**: Error occurred while retrieving user details.

---

### 2. Update User Details

**Endpoint:** `PUT ${userService}/user/:id`

**Description:** Updates the details of an existing user.

**Request Body:**

```json
{
  "username": "string",
  "fullname": "string",
  "email": "string",
  "birthdate": "string (ISO format)",
  "occupation": "string",
  "monthlyIncome": "number | null",
  "existingCredit": "boolean",
  "existingCreditAmount": "number | null",
  "monthlyInstallment": "boolean",
  "monthlyInstallmentAmount": "number | null"
}
```

**Response:**

- **200 OK**: User details updated successfully.
- **404 Not Found**: User not found.
- **500 Internal Server Error**: Error occurred while updating user.

---

### 4. Delete User

**Endpoint:** `DELETE ${userService}/user/:id`

**Description:** Deletes an existing user by ID.

**Response:**

- **200 OK**: User deleted successfully.
- **404 Not Found**: User not found.
- **500 Internal Server Error**: Error occurred while deleting user.

---

## Loan Service

The `loanService` handles loan management functionalities.

### 1. Get Loans

**Endpoint:** `GET ${loanApi}/loans`

**Description:** Fetches all loans associated with the authenticated user.

**Response:**

- **200 OK**: Returns a list of loans.

  **Example Response:**

  ```json
  [
    {
      "id": 1,
      "name": "Home Loan",
      "description": "Loan for purchasing a house."
    },
    {
      "id": 2,
      "name": "Car Loan",
      "description": "Loan for buying a car."
    }
  ]
  ```

- **401 Unauthorized**: User not authenticated.

- **500 Internal Server Error**: Server error occurred while retrieving loans.

---

### 2. Calculate Loan

**Endpoint:** `POST ${loanApi}/loan/calculate`

**Description:** Calculates loan payment details for a given loan.

**Request Body:**

```json
{
  "id": "number",
  "userId": "number",
  "amount": "number",
  "period": "number"
}
```

**Response:**

- **200 OK**: Returns loan calculation details.
- **400 Bad Request**: Missing or invalid input.
- **500 Internal Server Error**: Error occurred while calculating loan.

---

## Results Service

The `resultsService` provides details about loan results.

### 1. Get Results List

**Endpoint:** `GET ${resultsApi}/results/:userId`

**Description:** Fetches the list of loan results.

**Response:**

```json
[
  {
    "id": 1234,
    "loanname": "string",
    "date": "string",
    "interest": "number",
    "amounttopay": "number",
    "result": "SUCCESS"
  },
  {
    "id": 5678,
    "loanname": "string",
    "date": "string",
    "interest": "number",
    "amounttopay": "number",
    "result": "FAILED"
  }
]
```

- **200 OK**: Returns the list of results.
- **500 Internal Server Error**: Error occurred while retrieving the results.
