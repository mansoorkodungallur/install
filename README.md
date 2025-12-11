# Doha Offers MVP

A modern, full-stack web application clone of the Doha offers site featuring a responsive UI with search and filter capabilities.

## Features

- 🎨 Modern, responsive design for mobile and desktop
- 🔍 Real-time search functionality
- 🎯 Advanced filtering by category, location, and price range
- 💰 Display of discount percentages and pricing
- ⭐ Rating and review information
- 📍 Location-based browsing
- 🔄 Dynamic sorting options

## Tech Stack

### Frontend
- React 18
- Vite (build tool)
- CSS3 with responsive design

### Backend
- Node.js
- Express.js
- JSON-based data storage

## Project Structure

```
doha-offers-mvp/
├── backend/
│   ├── src/
│   │   └── server.js          # Express API server
│   ├── data/
│   │   └── offers.json        # Sample offers data
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Filters.jsx
│   │   │   └── OfferCard.jsx
│   │   ├── App.jsx            # Main application
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd doha-offers-mvp
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server (from the backend directory):
```bash
cd backend
npm start
```
The API will run on `http://localhost:5000`

2. In a new terminal, start the frontend development server (from the frontend directory):
```bash
cd frontend
npm run dev
```
The application will open at `http://localhost:3000`

## API Endpoints

### GET /api/offers
Retrieve all offers with optional filters:
- Query parameters: `category`, `minPrice`, `maxPrice`, `location`, `search`, `sortBy`
- Returns: JSON array of filtered offers

### GET /api/offers/:id
Get a specific offer by ID
- Returns: Single offer object

### GET /api/categories
Get all available categories
- Returns: Array of category names

### GET /api/locations
Get all available locations
- Returns: Array of location names

### GET /api/health
Health check endpoint
- Returns: Server status

## Features Implementation

### Search Functionality
- Real-time search across offer titles, descriptions, and categories
- Instant results as you type

### Filtering
- **Category Filter**: Filter by activity type (Restaurants, Beauty & Spa, Activities, Fitness)
- **Location Filter**: Filter by area in Doha
- **Price Range**: Set minimum and maximum price bounds
- **Sort Options**: 
  - Relevance (default)
  - Price: Low to High
  - Price: High to Low
  - Highest Discount
  - Highest Rated

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Touch-friendly interface
- Grid layout adapts to screen size

## Sample Data

The application includes 16 sample offers across various categories:
- Restaurants
- Beauty & Spa
- Activities
- Fitness

Each offer includes:
- Title and description
- Category and location
- Original price and discounted price
- Discount percentage
- Rating and review count
- Validity period
- High-quality placeholder images

## Future Enhancements

Potential features for future iterations:
- User authentication and profiles
- Booking system
- Payment integration
- Merchant dashboard
- Advanced analytics
- Social sharing
- Favorites/wishlist
- Reviews and ratings system
- Email notifications
- Multi-language support (Arabic/English)
- Map integration
- Mobile app (React Native)

## Development

### Frontend Development
```bash
cd frontend
npm run dev    # Start dev server
npm run build  # Build for production
npm run preview # Preview production build
```

### Backend Development
```bash
cd backend
npm start      # Start server
npm run dev    # Start with auto-reload (if configured)
```

## License

MIT

## Contributors

Built as an MVP for the Doha Offers platform.
