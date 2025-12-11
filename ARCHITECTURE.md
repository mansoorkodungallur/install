# Architecture Documentation - Doha Offers MVP

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│                    (http://localhost:3000)                   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP Requests
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Application                      │
│                    React + Vite + CSS                        │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Header     │  │  SearchBar   │  │   Filters    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Offers Grid                            │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐          │    │
│  │  │OfferCard │ │OfferCard │ │OfferCard │ ...     │    │
│  │  └──────────┘ └──────────┘ └──────────┘          │    │
│  └────────────────────────────────────────────────────┘    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ API Calls (/api/*)
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API Server                        │
│                  Express.js on Node.js                       │
│                  (http://localhost:5000)                     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │               API Endpoints                         │    │
│  │  GET  /api/offers                                   │    │
│  │  GET  /api/offers/:id                               │    │
│  │  GET  /api/categories                               │    │
│  │  GET  /api/locations                                │    │
│  │  GET  /api/health                                   │    │
│  └────────────────────────────────────────────────────┘    │
│                            │                                 │
│                            ▼                                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Data Layer                             │    │
│  │         backend/data/offers.json                    │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Component Hierarchy

```
App.jsx
│
├── Header.jsx
│   └── Navigation links
│
├── Hero Section
│   ├── Title
│   └── Subtitle
│
├── SearchBar.jsx
│   └── Search input with icon
│
├── Filters.jsx
│   ├── Category dropdown
│   ├── Location dropdown
│   ├── Price range inputs
│   ├── Sort dropdown
│   └── Clear filters button
│
├── Offers Grid
│   └── OfferCard.jsx (multiple instances)
│       ├── Image
│       ├── Discount badge
│       ├── Category badge
│       ├── Title
│       ├── Description
│       ├── Location
│       ├── Rating
│       ├── Price display
│       └── Buy button
│
└── Footer
    └── Copyright info
```

### State Management

```
App.jsx (Root State)
├── offers: []                    # All offers from API
├── filteredOffers: []            # After applying filters
├── categories: []                # Available categories
├── locations: []                 # Available locations
├── loading: boolean              # Loading state
└── filters: {                    # Filter state
    ├── search: string
    ├── category: string
    ├── location: string
    ├── minPrice: string
    ├── maxPrice: string
    └── sortBy: string
}
```

### Data Flow

```
User Interaction
       │
       ▼
Update Filter State
       │
       ▼
Trigger useEffect
       │
       ▼
Apply Filters Locally
       │
       ▼
Update filteredOffers
       │
       ▼
Re-render Grid
```

## Backend Architecture

### Server Structure

```
backend/
│
├── src/
│   └── server.js                 # Main server file
│       ├── Express app setup
│       ├── CORS configuration
│       ├── Route handlers
│       └── Server startup
│
└── data/
    └── offers.json               # Data storage
```

### Request Flow

```
HTTP Request
     │
     ▼
Express Router
     │
     ▼
Route Handler
     │
     ├─→ Parse query parameters
     ├─→ Load data from JSON
     ├─→ Apply filters
     ├─→ Sort results
     └─→ Format response
     │
     ▼
JSON Response
```

### API Response Format

```json
{
  "success": true,
  "count": 16,
  "offers": [
    {
      "id": 1,
      "title": "...",
      "description": "...",
      "category": "...",
      "price": 450,
      "originalPrice": 650,
      "discount": 31,
      "image": "...",
      "location": "...",
      "rating": 4.8,
      "reviewCount": 142,
      "validUntil": "2024-12-31"
    }
  ]
}
```

## Technology Stack Details

### Frontend Stack
```
┌─────────────────┐
│     React 18     │  Component-based UI
├─────────────────┤
│   Vite 5.0       │  Build tool & dev server
├─────────────────┤
│   Vanilla CSS    │  Styling
├─────────────────┤
│   ES6+ JS        │  Modern JavaScript
└─────────────────┘
```

### Backend Stack
```
┌─────────────────┐
│   Node.js 20+    │  Runtime environment
├─────────────────┤
│   Express.js     │  Web framework
├─────────────────┤
│   CORS           │  Cross-origin support
├─────────────────┤
│   JSON Storage   │  Data persistence
└─────────────────┘
```

## File System Structure

```
doha-offers-mvp/
│
├── frontend/                     # React application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   ├── SearchBar.jsx
│   │   │   ├── SearchBar.css
│   │   │   ├── Filters.jsx
│   │   │   ├── Filters.css
│   │   │   ├── OfferCard.jsx
│   │   │   └── OfferCard.css
│   │   ├── App.jsx              # Main app component
│   │   ├── App.css
│   │   ├── index.css            # Global styles
│   │   └── main.jsx             # Entry point
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   └── package.json
│
├── backend/                      # Express API
│   ├── src/
│   │   └── server.js            # API server
│   ├── data/
│   │   └── offers.json          # Data storage
│   └── package.json
│
├── logs/                         # Application logs
├── .gitignore                    # Git ignore rules
├── package.json                  # Root package config
├── start.sh                      # Start script
├── README.md                     # Main documentation
├── QUICKSTART.md                 # Quick start guide
├── FEATURES.md                   # Features documentation
├── DEPLOYMENT.md                 # Deployment guide
├── CONTRIBUTING.md               # Contribution guide
└── ARCHITECTURE.md               # This file
```

## Communication Flow

### Initial Page Load
```
1. Browser requests http://localhost:3000
2. Vite serves index.html
3. React app initializes
4. useEffect triggers data fetch
5. Three parallel API calls:
   - GET /api/offers
   - GET /api/categories
   - GET /api/locations
6. Backend reads offers.json
7. Backend returns JSON responses
8. Frontend updates state
9. Components re-render with data
10. User sees loaded offers
```

### Filter Interaction
```
1. User changes filter
2. Filter state updates
3. useEffect detects change
4. Client-side filtering applied
5. filteredOffers state updates
6. Grid re-renders
7. User sees filtered results
```

### Search Flow
```
1. User types in search bar
2. Search value updates in state
3. Filter function runs
4. Matches checked against:
   - title
   - description
   - category
5. Results updated
6. UI shows matching offers
```

## Design Patterns

### Component Pattern
- **Functional Components**: All components use React hooks
- **Single Responsibility**: Each component has one clear purpose
- **Composition**: Smaller components compose larger ones

### State Management
- **Local State**: Using useState for component-specific state
- **Prop Drilling**: Props passed down from App to children
- **Event Lifting**: Child components call parent handlers

### API Design
- **RESTful**: Standard REST conventions
- **Stateless**: No server-side sessions
- **JSON**: All responses in JSON format

### CSS Architecture
- **Component-Scoped**: Each component has its own CSS file
- **BEM-inspired**: Block Element Modifier naming
- **Mobile-First**: Responsive from small to large screens

## Scalability Considerations

### Current MVP Limitations
- JSON file storage (not suitable for production)
- No caching mechanism
- Client-side filtering (limited by data size)
- No pagination
- No authentication

### Upgrade Path
```
Phase 1 (Current)          Phase 2                Phase 3
JSON Storage          →    PostgreSQL/MongoDB  →  Sharded Database
No Auth              →    JWT Auth            →  OAuth + RBAC
No Caching           →    Redis Cache         →  CDN + Redis
Client Filtering     →    Server Filtering    →  Elasticsearch
```

## Security Architecture

### Current Implementation
- CORS enabled for cross-origin requests
- React's built-in XSS protection
- Express.json() for request parsing
- Environment variable support

### Production Recommendations
- Add rate limiting
- Implement input validation
- Use HTTPS only
- Add authentication
- Implement API keys
- Add request logging
- Use security headers (helmet.js)

## Performance Optimization

### Frontend
- Vite's optimized build
- CSS minification
- JavaScript bundling
- Tree shaking
- Code splitting ready

### Backend
- Express is lightweight
- JSON parsing optimized
- Single file read on startup
- In-memory data (fast access)

### Future Optimizations
- Image lazy loading
- Virtual scrolling for large lists
- API response caching
- Service worker for offline support
- GraphQL for efficient queries

## Development Workflow

```
Developer
    │
    ├─→ Edit Frontend Code
    │       └─→ Vite Hot Reload (instant feedback)
    │
    └─→ Edit Backend Code
            └─→ Manual restart (npm start)
```

## Testing Strategy

### Unit Testing (Recommended)
```
Frontend: Jest + React Testing Library
Backend: Jest + Supertest
```

### Integration Testing
```
Test API endpoints
Test component interactions
Test filter combinations
```

### E2E Testing
```
Cypress or Playwright
Test user flows
Test responsive design
```

## Deployment Architecture (Production)

```
┌─────────────────────────────────────────┐
│              CDN (CloudFlare)            │
│         Static Assets Caching            │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         Frontend (Vercel/Netlify)       │
│              Static Site                 │
└─────────────────┬───────────────────────┘
                  │
                  │ API Calls
                  │
┌─────────────────▼───────────────────────┐
│      Backend (Heroku/Railway)           │
│         Express API Server               │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│    Database (PostgreSQL/MongoDB)        │
│         Production Data Store            │
└─────────────────────────────────────────┘
```

---

This architecture is designed for MVP speed while maintaining a clear upgrade path to production scale.
