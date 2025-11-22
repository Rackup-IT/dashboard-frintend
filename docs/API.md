# BDC Dashboard API Documentation

## Overview

This document describes the RESTful API endpoints for the BDC (Business Development Center) Dashboard application.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently uses placeholder authentication. All protected routes require authentication (implemented as middleware).

### Authentication Endpoints

#### POST /auth/login

Login with username and password.

**Request Body:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "username": "admin"
  },
  "message": "Login successful"
}
```

#### POST /auth/logout

Logout current user.

#### GET /auth/me

Get current authenticated user information.

## Data Management Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Dealers

- `GET /dealers` - Get all dealers
- `GET /dealers/:id` - Get dealer by ID
- `POST /dealers` - Create new dealer
- `PUT /dealers/:id` - Update dealer
- `DELETE /dealers/:id` - Delete dealer

### Employees

- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Departments

- `GET /departments` - Get all departments
- `POST /departments` - Create new department

### Scenarios

- `GET /scenarios` - Get all scenarios
- `POST /scenarios` - Create new scenario

### Lead Sources

- `GET /lead-sources` - Get all lead sources
- `POST /lead-sources` - Create new lead source

### Roles

- `GET /roles` - Get all roles
- `GET /roles/:id` - Get role by ID
- `POST /roles` - Create new role
- `PUT /roles/:id` - Update role

### Appointments

- `GET /appointments` - Get all appointments
- `GET /appointments/:id` - Get appointment by ID
- `POST /appointments` - Create new appointment
- `PUT /appointments/:id` - Update appointment

### Calls

- `GET /calls` - Get all calls
- `POST /calls` - Create new call log

### SMS Management

- `GET /sms-logs` - Get SMS logs
- `GET /pending-sms` - Get pending SMS
- `POST /sms-logs` - Create SMS log
- `POST /pending-sms` - Create pending SMS

### Analytics

- `GET /dashboard/stats` - Get dashboard statistics
- `GET /leaderboard` - Get leaderboard data

## Data Validation

All POST and PUT requests use Zod schema validation based on the database schema definitions in `/shared/schema.ts`.

## Error Responses

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error responses include:

```json
{
  "error": "Error message",
  "details": "Additional error details (for validation errors)"
}
```

## Default Data

The in-memory storage initializes with:

- Admin user (username: `admin`, password: `admin123`)
- Default roles: Admin, Manager, Agent
- Default departments: Sales, Service, BDC

## Testing

Run the API test script:

```bash
node test-api.js
```

## Next Steps

1. Implement proper password hashing (bcrypt)
2. Add session/JWT token management
3. Implement role-based access control
4. Add database persistence (PostgreSQL with Drizzle ORM)
5. Add input validation middleware
6. Add rate limiting
7. Add request logging
8. Add API documentation (Swagger/OpenAPI)
