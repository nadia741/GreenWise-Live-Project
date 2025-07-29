# GreenWise API Documentation v1.0

## Base URL
```
http://localhost:5000
```

## Getting Started

1. Install dependencies:
```bash
cd server
npm install
```

2. Create a `.env` file with:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
```

3. Start the server:
```bash
npm run dev
```

## Authentication Endpoints

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:** (201 Created)
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "JWT_TOKEN"
}
```

**Error Responses:**
- Email already exists (400):
```json
{
  "message": "User already exists"
}
```
- Invalid data (400):
```json
{
  "message": "Invalid user data"
}
```

### Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:** (200 OK)
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "JWT_TOKEN"
}
```

**Error Response:**
- Invalid credentials (401):
```json
{
  "message": "Invalid email or password"
}
```

## Product Endpoints

### Create Product
```http
POST /api/products
```

**Headers Required:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "name": "Eco-Friendly Water Bottle",
  "description": "Reusable stainless steel water bottle",
  "price": 29.99,
  "category": "accessories", // as enum: ['general', 'food', 'clothing', 'electronics', 'home', 'accessories'],
  "image": "http://example.com/image.jpg",
  "sustainabilityScore": 9,  // Must be between 0 and 10
  "inventory": 100,
  "sustainabilityFeatures": [
    "Recyclable",
    "BPA-free",
    "Long-lasting"
  ]
}
```

**Success Response:** (201 Created)
```json
{
  "_id": "product_id",
  "name": "Eco-Friendly Water Bottle",
  "description": "Reusable stainless steel water bottle",
  "price": 29.99,
  "category": "Accessories",
  "image": "http://example.com/image.jpg",
  "sustainabilityScore": 9,
  "inventory": 100,
  "sustainabilityFeatures": ["Recyclable", "BPA-free", "Long-lasting"],
  "averageRating": 0,
  "numReviews": 0,
  "createdAt": "2025-07-29T10:00:00.000Z",
  "updatedAt": "2025-07-29T10:00:00.000Z"
}
```

**Error Responses:**
- Validation Error (400):
```json
{
  "message": "Product validation failed: sustainabilityScore: Path 'sustainabilityScore' (30) is more than maximum allowed value (10)."
}
```
- Unauthorized (401):
```json
{
  "message": "Not authorized, no token"
}
```

### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `search` (string): Search in name and description
- `category` (string): Filter by category
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `minSustainabilityScore` (number): Minimum sustainability score (0-10)

**Example:**
```
GET /api/products?category=Accessories&minPrice=20&maxPrice=50&minSustainabilityScore=8
```

**Success Response:** (200 OK)
```json
[
  {
    "_id": "product_id",
    "name": "Eco-Friendly Water Bottle",
    "description": "Reusable stainless steel water bottle",
    "price": 29.99,
    "category": "Accessories",
    "image": "http://example.com/image.jpg",
    "sustainabilityScore": 9,
    "inventory": 100,
    "sustainabilityFeatures": ["Recyclable", "BPA-free", "Long-lasting"],
    "averageRating": 4.5,
    "numReviews": 10
  }
]
```

## Order Endpoints

### Create Order
```http
POST /api/orders
```

**Headers Required:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "orderItems": [
    {
      "name": "Eco-Friendly Water Bottle",
      "quantity": 2,
      "image": "http://example.com/image.jpg",
      "price": 29.99,
      "product": "product_id"
    }
  ],
  "shippingAddress": {
    "address": "123 Green Street",
    "city": "Eco City",
    "postalCode": "12345",
    "country": "USA"
  },
  "totalPrice": 59.98
}
```

**Success Response:** (201 Created)
```json
{
  "_id": "order_id",
  "user": "user_id",
  "orderItems": [
    {
      "name": "Eco-Friendly Water Bottle",
      "quantity": 2,
      "image": "http://example.com/image.jpg",
      "price": 29.99,
      "product": "product_id"
    }
  ],
  "shippingAddress": {
    "address": "123 Green Street",
    "city": "Eco City",
    "postalCode": "12345",
    "country": "USA"
  },
  "totalPrice": 59.98,
  "status": "pending",
  "createdAt": "2025-07-29T10:00:00.000Z"
}
```

**Error Responses:**
- Insufficient inventory (400):
```json
{
  "message": "Not enough inventory for Eco-Friendly Water Bottle"
}
```
- No order items (400):
```json
{
  "message": "No order items"
}
```

## Review Endpoints

### Create Review
```http
POST /api/reviews/:productId
```

**Headers Required:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "rating": 5,  // Must be between 1 and 5
  "comment": "Great eco-friendly product!"
}
```

**Success Response:** (201 Created)
```json
{
  "_id": "review_id",
  "user": "user_id",
  "product": "product_id",
  "rating": 5,
  "comment": "Great eco-friendly product!",
  "createdAt": "2025-07-29T10:00:00.000Z"
}
```

**Error Responses:**
- Already reviewed (400):
```json
{
  "message": "Product already reviewed"
}
```
- Invalid rating (400):
```json
{
  "message": "Rating must be between 1 and 5"
}
```

## User Management

### Get User Profile
```http
GET /api/users/me
```

**Headers Required:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response:** (200 OK)
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "address": {
    "street": "123 Green Street",
    "city": "Eco City",
    "state": "EC",
    "zipCode": "12345",
    "country": "USA"
  },
  "preferences": {
    "sustainabilityPreferences": ["Organic", "Plastic-free"],
    "newsletterSubscribed": true
  }
}
```

### Update Profile
```http
PUT /api/users/me
```

**Headers Required:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:** (all fields optional)
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "password": "newpassword123",
  "address": {
    "street": "456 Eco Avenue",
    "city": "Green City",
    "state": "GC",
    "zipCode": "67890",
    "country": "USA"
  },
  "preferences": {
    "sustainabilityPreferences": ["Organic", "Plastic-free", "Local"],
    "newsletterSubscribed": true
  }
}
```

**Success Response:** (200 OK)
```json
{
  "_id": "user_id",
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "address": {
    "street": "456 Eco Avenue",
    "city": "Green City",
    "state": "GC",
    "zipCode": "67890",
    "country": "USA"
  },
  "preferences": {
    "sustainabilityPreferences": ["Organic", "Plastic-free", "Local"],
    "newsletterSubscribed": true
  }
}
```

## Wishlist Management

### Add to Wishlist
```http
POST /api/users/wishlist/:productId
```

**Headers Required:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response:** (200 OK)
```json
[
  "product_id_1",
  "product_id_2"
]
```

**Error Response:**
- Already in wishlist (400):
```json
{
  "message": "Product already in wishlist"
}
```

### Get Wishlist
```http
GET /api/users/wishlist
```

**Headers Required:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Success Response:** (200 OK)
```json
[
  {
    "_id": "product_id",
    "name": "Eco-Friendly Water Bottle",
    "price": 29.99,
    "image": "http://example.com/image.jpg",
    "sustainabilityScore": 9
  }
]
```

## General Error Responses

### Authentication Errors
- No Token (401):
```json
{
  "message": "Not authorized, no token"
}
```

- Invalid Token (401):
```json
{
  "message": "Not authorized, token failed"
}
```

### Validation Errors (400)
```json
{
  "message": "Validation error message",
  "errors": {
    "field": "Specific error message"
  }
}
```

### Not Found (404)
```json
{
  "message": "Resource not found"
}
```

### Server Error (500)
```json
{
  "message": "Server Error",
  "stack": "Error stack trace (only in development mode)"
}
```

## Testing the API

You can test the API using tools like:
- Postman
- cURL
- Thunder Client (VS Code Extension)

Example cURL command for login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

Remember to:
1. Save the JWT token from login/register response
2. Include the token in the Authorization header for protected routes
3. Follow the validation rules for each endpoint
4. Handle both success and error responses in your frontend

## Important Notes

1. All protected routes require JWT token in Authorization header
2. Sustainability score must be between 0 and 10
3. Product ratings must be between 1 and 5
4. Users can only review a product once
5. Order creation checks inventory availability
6. Passwords are automatically hashed before saving
7. Server runs in development mode by default
8. MongoDB connection must be configured in .env file
