# Quick Start Guide - Doha Offers MVP

Get up and running in 5 minutes!

## Prerequisites
- Node.js v14+ installed
- npm installed

## Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Run the Application

### Option 1: Use the Start Script (Recommended)
```bash
./start.sh
```

### Option 2: Manual Start
```bash
# Terminal 1 - Start Backend
cd backend
npm start
# Backend runs on http://localhost:5000

# Terminal 2 - Start Frontend
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

## Access the Application

Open your browser and visit: **http://localhost:3000**

The backend API is available at: **http://localhost:5000**

## Test the API

```bash
# Health check
curl http://localhost:5000/api/health

# Get all offers
curl http://localhost:5000/api/offers

# Get categories
curl http://localhost:5000/api/categories

# Search offers
curl "http://localhost:5000/api/offers?search=spa"

# Filter by category
curl "http://localhost:5000/api/offers?category=Restaurants"
```

## Project Structure

```
doha-offers-mvp/
├── backend/           # Node.js/Express API
│   ├── src/
│   │   └── server.js
│   ├── data/
│   │   └── offers.json
│   └── package.json
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── start.sh          # Convenience script
```

## Key Features to Test

1. **Search**: Type in the search bar to find offers
2. **Filter by Category**: Select from dropdown (Restaurants, Beauty & Spa, etc.)
3. **Filter by Location**: Choose a location in Doha
4. **Price Range**: Set min/max price filters
5. **Sort**: Sort by price, discount, or rating
6. **Responsive**: Resize browser to see mobile layout

## Common Commands

```bash
# Build frontend for production
cd frontend && npm run build

# Stop all servers
pkill -f "node src/server.js"
pkill -f "vite"

# View logs
tail -f logs/backend.log
tail -f logs/frontend.log
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### CORS Issues
- Ensure backend is running before starting frontend
- Check that API URL in frontend matches backend URL

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- Read [README.md](README.md) for detailed documentation
- Check [FEATURES.md](FEATURES.md) for feature descriptions
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guides
- Review [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## Need Help?

- Check the logs in `logs/` directory
- Ensure Node.js version is 14 or higher: `node --version`
- Verify npm is installed: `npm --version`

---

**That's it! You should now see the Doha Offers MVP running in your browser.** 🎉
