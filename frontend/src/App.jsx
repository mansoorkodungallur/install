import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import OfferCard from './components/OfferCard'
import './App.css'

function App() {
  const [offers, setOffers] = useState([])
  const [filteredOffers, setFilteredOffers] = useState([])
  const [categories, setCategories] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    location: 'all',
    minPrice: '',
    maxPrice: '',
    sortBy: 'relevance'
  })

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, offers])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      const [offersRes, categoriesRes, locationsRes] = await Promise.all([
        fetch('/api/offers'),
        fetch('/api/categories'),
        fetch('/api/locations')
      ])

      const offersData = await offersRes.json()
      const categoriesData = await categoriesRes.json()
      const locationsData = await locationsRes.json()

      setOffers(offersData.offers || [])
      setFilteredOffers(offersData.offers || [])
      setCategories(categoriesData.categories || [])
      setLocations(locationsData.locations || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...offers]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        offer =>
          offer.title.toLowerCase().includes(searchLower) ||
          offer.description.toLowerCase().includes(searchLower) ||
          offer.category.toLowerCase().includes(searchLower)
      )
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(
        offer => offer.category.toLowerCase() === filters.category.toLowerCase()
      )
    }

    if (filters.location !== 'all') {
      filtered = filtered.filter(
        offer => offer.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter(offer => offer.price >= parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(offer => offer.price <= parseInt(filters.maxPrice))
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    setFilteredOffers(filtered)
  }

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      location: 'all',
      minPrice: '',
      maxPrice: '',
      sortBy: 'relevance'
    })
  }

  return (
    <div className="app">
      <Header />
      
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">Discover Amazing Deals in Doha</h1>
          <p className="hero-subtitle">
            Find the best offers on dining, activities, spa, fitness and more
          </p>
        </div>
      </div>

      <div className="container">
        <SearchBar 
          searchValue={filters.search}
          onSearchChange={(value) => updateFilter('search', value)}
        />

        <Filters
          filters={filters}
          categories={categories}
          locations={locations}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
        />

        <div className="results-header">
          <h2 className="results-count">
            {loading ? 'Loading...' : `${filteredOffers.length} Offers Found`}
          </h2>
        </div>

        {loading ? (
          <div className="loading">Loading offers...</div>
        ) : filteredOffers.length === 0 ? (
          <div className="no-results">
            <h3>No offers found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="offers-grid">
            {filteredOffers.map(offer => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Doha Offers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
