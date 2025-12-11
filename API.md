# API Documentation - Doha Offers MVP

Base URL: `http://localhost:5000`

## Overview

The Doha Offers API provides RESTful endpoints to access and filter offers data. All responses are in JSON format.

## Endpoints

### Health Check

Check if the API server is running.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-12-11T20:00:00.000Z"
}
```

**Status Codes:**
- `200` - Server is healthy

---

### Get All Offers

Retrieve all offers with optional filtering and sorting.

**Endpoint:** `GET /api/offers`

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `search` | string | Search term for title/description/category | `spa` |
| `category` | string | Filter by category | `Restaurants` |
| `location` | string | Filter by location | `West Bay` |
| `minPrice` | number | Minimum price in QAR | `100` |
| `maxPrice` | number | Maximum price in QAR | `500` |
| `sortBy` | string | Sort criteria | `price-low` |

**Sort Options:**
- `relevance` (default) - No specific sorting
- `price-low` - Price: Low to High
- `price-high` - Price: High to Low
- `discount` - Highest discount first
- `rating` - Highest rated first

**Example Requests:**

```bash
# Get all offers
curl http://localhost:5000/api/offers

# Search for spa offers
curl "http://localhost:5000/api/offers?search=spa"

# Filter by category
curl "http://localhost:5000/api/offers?category=Restaurants"

# Filter by location
curl "http://localhost:5000/api/offers?location=West%20Bay"

# Price range filter
curl "http://localhost:5000/api/offers?minPrice=100&maxPrice=500"

# Sort by price
curl "http://localhost:5000/api/offers?sortBy=price-low"

# Combine multiple filters
curl "http://localhost:5000/api/offers?category=Beauty%20%26%20Spa&maxPrice=300&sortBy=discount"
```

**Success Response:**

```json
{
  "success": true,
  "count": 16,
  "offers": [
    {
      "id": 1,
      "title": "Luxury Spa Package at Pearl-Qatar",
      "description": "Indulge in a premium spa experience...",
      "category": "Beauty & Spa",
      "price": 450,
      "originalPrice": 650,
      "discount": 31,
      "image": "https://images.unsplash.com/photo-...",
      "location": "The Pearl-Qatar",
      "rating": 4.8,
      "reviewCount": 142,
      "validUntil": "2024-12-31"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### Get Offer by ID

Retrieve a specific offer by its ID.

**Endpoint:** `GET /api/offers/:id`

**Parameters:**
- `id` (path) - The offer ID (integer)

**Example Request:**

```bash
curl http://localhost:5000/api/offers/1
```

**Success Response:**

```json
{
  "success": true,
  "offer": {
    "id": 1,
    "title": "Luxury Spa Package at Pearl-Qatar",
    "description": "Indulge in a premium spa experience...",
    "category": "Beauty & Spa",
    "price": 450,
    "originalPrice": 650,
    "discount": 31,
    "image": "https://images.unsplash.com/photo-...",
    "location": "The Pearl-Qatar",
    "rating": 4.8,
    "reviewCount": 142,
    "validUntil": "2024-12-31"
  }
}
```

**Error Response (Not Found):**

```json
{
  "success": false,
  "message": "Offer not found"
}
```

**Status Codes:**
- `200` - Success
- `404` - Offer not found
- `500` - Server error

---

### Get Categories

Retrieve all available offer categories.

**Endpoint:** `GET /api/categories`

**Example Request:**

```bash
curl http://localhost:5000/api/categories
```

**Success Response:**

```json
{
  "success": true,
  "categories": [
    "Beauty & Spa",
    "Restaurants",
    "Activities",
    "Fitness"
  ]
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### Get Locations

Retrieve all available locations.

**Endpoint:** `GET /api/locations`

**Example Request:**

```bash
curl http://localhost:5000/api/locations
```

**Success Response:**

```json
{
  "success": true,
  "locations": [
    "The Pearl-Qatar",
    "West Bay",
    "Qatar Desert",
    "Aspire Zone",
    "Katara Cultural Village",
    "Souq Waqif",
    "Lusail Marina",
    "Corniche",
    "City Center Mall",
    "Industrial Area"
  ]
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

## Data Models

### Offer Object

```typescript
{
  id: number;              // Unique identifier
  title: string;           // Offer title
  description: string;     // Detailed description
  category: string;        // Category name
  price: number;           // Current price in QAR
  originalPrice: number;   // Original price in QAR
  discount: number;        // Discount percentage
  image: string;           // Image URL
  location: string;        // Location name
  rating: number;          // Rating (0-5)
  reviewCount: number;     // Number of reviews
  validUntil: string;      // Expiry date (ISO format)
}
```

---

## Error Handling

All API errors return a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

**Common Error Codes:**
- `400` - Bad Request (invalid parameters)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

---

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

---

## Rate Limiting

Currently not implemented. Recommended for production:
- 100 requests per 15 minutes per IP
- Use `express-rate-limit` package

---

## Authentication

Currently not implemented. Future versions will support:
- JWT-based authentication
- API key authentication
- OAuth 2.0

---

## Examples with JavaScript

### Using Fetch API

```javascript
// Get all offers
fetch('http://localhost:5000/api/offers')
  .then(response => response.json())
  .then(data => console.log(data.offers));

// Search offers
fetch('http://localhost:5000/api/offers?search=spa&sortBy=discount')
  .then(response => response.json())
  .then(data => console.log(data.offers));

// Get specific offer
fetch('http://localhost:5000/api/offers/1')
  .then(response => response.json())
  .then(data => console.log(data.offer));
```

### Using Axios

```javascript
import axios from 'axios';

// Get all offers
const offers = await axios.get('http://localhost:5000/api/offers');

// With filters
const filtered = await axios.get('http://localhost:5000/api/offers', {
  params: {
    category: 'Restaurants',
    maxPrice: 500,
    sortBy: 'rating'
  }
});
```

---

## Testing with curl

```bash
# Get all offers (pretty print)
curl -s http://localhost:5000/api/offers | jq

# Get specific fields only
curl -s http://localhost:5000/api/offers | jq '.offers[] | {title, price, location}'

# Count offers by category
curl -s http://localhost:5000/api/offers?category=Restaurants | jq '.count'

# Get cheapest offer
curl -s "http://localhost:5000/api/offers?sortBy=price-low" | jq '.offers[0]'

# Get highest discount
curl -s "http://localhost:5000/api/offers?sortBy=discount" | jq '.offers[0] | {title, discount}'
```

---

## Future Endpoints (Planned)

### Phase 2
- `POST /api/offers` - Create new offer (admin)
- `PUT /api/offers/:id` - Update offer (admin)
- `DELETE /api/offers/:id` - Delete offer (admin)
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/users/profile` - Get user profile

### Phase 3
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking
- `POST /api/reviews` - Add review
- `GET /api/offers/:id/reviews` - Get offer reviews
- `POST /api/favorites` - Add to favorites
- `GET /api/favorites` - Get user favorites

---

## Versioning

Current Version: `v1` (implicit)

Future versions will be accessed via:
- `/api/v2/offers`
- `/api/v3/offers`

---

## Support

For API issues or questions:
1. Check this documentation
2. Review FEATURES.md for functionality
3. See CONTRIBUTING.md for bug reports
4. Check backend logs: `logs/backend.log`

---

## Performance

Current performance metrics:
- Average response time: < 50ms (local)
- Max response time: < 100ms (local)
- Concurrent requests: Handles 100+ (tested)

For production, consider:
- Caching with Redis
- Database optimization
- CDN for images
- Load balancing

---

**Last Updated:** December 11, 2024
**API Version:** 1.0.0
