import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const offersData = JSON.parse(
  readFileSync(join(__dirname, '../data/offers.json'), 'utf-8')
);

app.get('/api/offers', (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      location,
      search,
      sortBy = 'relevance'
    } = req.query;

    let filteredOffers = [...offersData];

    if (category && category !== 'all') {
      filteredOffers = filteredOffers.filter(
        offer => offer.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (minPrice) {
      filteredOffers = filteredOffers.filter(
        offer => offer.price >= parseInt(minPrice)
      );
    }

    if (maxPrice) {
      filteredOffers = filteredOffers.filter(
        offer => offer.price <= parseInt(maxPrice)
      );
    }

    if (location && location !== 'all') {
      filteredOffers = filteredOffers.filter(
        offer => offer.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredOffers = filteredOffers.filter(
        offer =>
          offer.title.toLowerCase().includes(searchLower) ||
          offer.description.toLowerCase().includes(searchLower) ||
          offer.category.toLowerCase().includes(searchLower)
      );
    }

    switch (sortBy) {
      case 'price-low':
        filteredOffers.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredOffers.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        filteredOffers.sort((a, b) => b.discount - a.discount);
        break;
      case 'rating':
        filteredOffers.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    res.json({
      success: true,
      count: filteredOffers.length,
      offers: filteredOffers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching offers',
      error: error.message
    });
  }
});

app.get('/api/offers/:id', (req, res) => {
  try {
    const offer = offersData.find(o => o.id === parseInt(req.params.id));
    
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }

    res.json({
      success: true,
      offer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching offer',
      error: error.message
    });
  }
});

app.get('/api/categories', (req, res) => {
  try {
    const categories = [...new Set(offersData.map(offer => offer.category))];
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

app.get('/api/locations', (req, res) => {
  try {
    const locations = [...new Set(offersData.map(offer => offer.location))];
    res.json({
      success: true,
      locations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching locations',
      error: error.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Loaded ${offersData.length} offers`);
});
