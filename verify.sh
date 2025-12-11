#!/bin/bash

echo "🔍 Verifying Doha Offers MVP Project..."
echo ""

# Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    echo "✅ Node.js $(node --version) installed"
else
    echo "❌ Node.js not found"
    exit 1
fi

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    echo "✅ npm $(npm --version) installed"
else
    echo "❌ npm not found"
    exit 1
fi

echo ""
echo "Checking project structure..."

# Check backend
if [ -d "backend" ] && [ -f "backend/package.json" ] && [ -f "backend/src/server.js" ]; then
    echo "✅ Backend structure is correct"
else
    echo "❌ Backend structure is incorrect"
    exit 1
fi

# Check frontend
if [ -d "frontend" ] && [ -f "frontend/package.json" ] && [ -f "frontend/src/App.jsx" ]; then
    echo "✅ Frontend structure is correct"
else
    echo "❌ Frontend structure is incorrect"
    exit 1
fi

# Check components
if [ -f "frontend/src/components/Header.jsx" ] && \
   [ -f "frontend/src/components/SearchBar.jsx" ] && \
   [ -f "frontend/src/components/Filters.jsx" ] && \
   [ -f "frontend/src/components/OfferCard.jsx" ]; then
    echo "✅ All frontend components present"
else
    echo "❌ Some frontend components are missing"
    exit 1
fi

# Check data
if [ -f "backend/data/offers.json" ]; then
    OFFER_COUNT=$(cat backend/data/offers.json | grep -c '"id":')
    echo "✅ Offers data present ($OFFER_COUNT offers)"
else
    echo "❌ Offers data is missing"
    exit 1
fi

# Check documentation
DOC_FILES=("README.md" "QUICKSTART.md" "FEATURES.md" "DEPLOYMENT.md" "CONTRIBUTING.md" "ARCHITECTURE.md" "CHANGELOG.md" "PROJECT_SUMMARY.md")
MISSING_DOCS=0
for doc in "${DOC_FILES[@]}"; do
    if [ ! -f "$doc" ]; then
        echo "❌ Missing documentation: $doc"
        MISSING_DOCS=1
    fi
done

if [ $MISSING_DOCS -eq 0 ]; then
    echo "✅ All documentation files present"
fi

# Check dependencies
echo ""
echo "Checking dependencies..."

if [ -d "backend/node_modules" ]; then
    echo "✅ Backend dependencies installed"
else
    echo "⚠️  Backend dependencies not installed (run: cd backend && npm install)"
fi

if [ -d "frontend/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Frontend dependencies not installed (run: cd frontend && npm install)"
fi

# Check gitignore
if [ -f ".gitignore" ]; then
    echo "✅ .gitignore present"
else
    echo "❌ .gitignore missing"
fi

# Check start script
if [ -x "start.sh" ]; then
    echo "✅ Start script is executable"
else
    echo "⚠️  Start script needs execute permission (run: chmod +x start.sh)"
fi

echo ""
echo "======================================"
echo "✅ Project verification complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Install dependencies (if not already done):"
echo "   cd backend && npm install"
echo "   cd ../frontend && npm install"
echo ""
echo "2. Run the application:"
echo "   ./start.sh"
echo ""
echo "3. Access the app:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
