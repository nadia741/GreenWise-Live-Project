# GreenWise API Documentation

## Base URL

```
http://localhost:5001/api
```

## Authentication

### Register User

```http
POST /auth/register
```

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:** (201 Created)

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "token": "string"
}
```

### Login User

```http
POST /auth/login
```

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** (200 OK)

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "token": "string"
}
```

## Users

All these endpoints require Authentication Header: `Bearer <token>`

### Get User Profile

```http
GET /users/me
```

**Response:** (200 OK)

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "preferences": {
    "sustainabilityPreferences": ["string"],
    "newsletterSubscribed": "boolean"
  }
}
```

### Update User Profile

```http
PUT /users/me
```

**Request Body:** (all fields optional)

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "preferences": {
    "sustainabilityPreferences": ["string"],
    "newsletterSubscribed": "boolean"
  }
}
```

**Response:** (200 OK)

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "address": "object",
  "preferences": "object"
}
```

### Wishlist Operations

#### Get Wishlist

```http
GET /users/wishlist
```

**Response:** (200 OK)

```json
[
  {
    "_id": "string",
    "name": "string",
    "price": "number",
    "image": "string"
    // ... other product fields
  }
]
```

#### Add to Wishlist

```http
POST /users/wishlist/:productId
```

**Response:** (200 OK)

```json
[
  "string" // Array of product IDs
]
```

#### Remove from Wishlist

```http
DELETE /users/wishlist/:productId
```

**Response:** (200 OK)

```json
[
  "string" // Array of remaining product IDs
]
```

## Products

### Get All Products

```http
GET /products
```

**Query Parameters:**

- `search`: string (search in name and description)
- `category`: string
- `minPrice`: number
- `maxPrice`: number
- `minSustainabilityScore`: number (0-10)

**Response:** (200 OK)

```json
[
  {
    "_id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "category": "string",
    "image": "string",
    "sustainabilityScore": "number",
    "inventory": "number",
    "averageRating": "number",
    "numReviews": "number",
    "sustainabilityFeatures": ["string"]
  }
]
```

### Get Single Product

```http
GET /products/:id
```

**Response:** (200 OK)

```json
{
  "_id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "image": "string",
  "sustainabilityScore": "number",
  "inventory": "number",
  "averageRating": "number",
  "numReviews": "number",
  "sustainabilityFeatures": ["string"]
}
```

### Create Product (Admin Only)

```http
POST /products
```

**Request Body:**

```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "image": "string",
  "sustainabilityScore": "number",
  "inventory": "number",
  "sustainabilityFeatures": ["string"]
}
```

### Update Product (Admin Only)

```http
PUT /products/:id
```

**Request Body:** (all fields optional)

```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "image": "string",
  "sustainabilityScore": "number",
  "inventory": "number",
  "sustainabilityFeatures": ["string"]
}
```

### Delete Product (Admin Only)

```http
DELETE /products/:id
```

## Reviews

### Get Product Reviews

```http
GET /reviews/:productId
```

**Response:** (200 OK)

```json
[
  {
    "_id": "string",
    "user": {
      "_id": "string",
      "name": "string"
    },
    "rating": "number",
    "comment": "string",
    "createdAt": "date"
  }
]
```

### Create Review

```http
POST /reviews/:productId
```

**Request Body:**

```json
{
  "rating": "number",
  "comment": "string"
}
```

**Response:** (201 Created)

```json
{
  "_id": "string",
  "user": "string",
  "product": "string",
  "rating": "number",
  "comment": "string",
  "createdAt": "date"
}
```

### Update Review

```http
PUT /reviews/:productId/:reviewId
```

**Request Body:**

```json
{
  "rating": "number",
  "comment": "string"
}
```

### Delete Review

```http
DELETE /reviews/:productId/:reviewId
```

## Orders

### Create Order

```http
POST /orders
```

**Request Body:**

```json
{
  "orderItems": [
    {
      "name": "string",
      "quantity": "number",
      "image": "string",
      "price": "number",
      "product": "string" // product ID
    }
  ],
  "shippingAddress": {
    "address": "string",
    "city": "string",
    "postalCode": "string",
    "country": "string"
  },
  "totalPrice": "number"
}
```

**Response:** (201 Created)

```json
{
  "_id": "string",
  "user": "string",
  "orderItems": ["object"],
  "shippingAddress": "object",
  "totalPrice": "number",
  "status": "string",
  "createdAt": "date"
}
```

### Get Order by ID

```http
GET /orders/:id
```

**Response:** (200 OK)

```json
{
  "_id": "string",
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string"
  },
  "orderItems": [
    {
      "name": "string",
      "quantity": "number",
      "image": "string",
      "price": "number",
      "product": "string"
    }
  ],
  "shippingAddress": {
    "address": "string",
    "city": "string",
    "postalCode": "string",
    "country": "string"
  },
  "totalPrice": "number",
  "status": "string",
  "createdAt": "date"
}
```

### Get User Orders

```http
GET /orders
```

**Response:** (200 OK)

```json
[
  {
    "_id": "string",
    "orderItems": ["object"],
    "shippingAddress": "object",
    "totalPrice": "number",
    "status": "string",
    "createdAt": "date"
  }
]
```

### Update Order Status (Admin Only)

```http
PUT /orders/:id/status
```

**Request Body:**

```json
{
  "status": "string" // "pending" | "processing" | "shipped" | "delivered"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "message": "Error message describing the issue"
}
```

### 401 Unauthorized

```json
{
  "message": "Not authorized, no token"
}
```

### 404 Not Found

```json
{
  "message": "Resource not found"
}
```

## Authentication

For protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Notes

1. All protected routes require a valid JWT token in the Authorization header
2. Admin routes require both authentication and admin privileges
3. Dates are returned in ISO 8601 format
4. IDs are MongoDB ObjectId strings
5. Error responses include a message field describing the error
6. Sustainability score ranges from 0 to 10
7. Product images should be URLs
8. Order status can be: "pending", "processing", "shipped", or "delivered"
