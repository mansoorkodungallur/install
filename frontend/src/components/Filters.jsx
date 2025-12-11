import './Filters.css'

function Filters({ filters, categories, locations, onFilterChange, onClearFilters }) {
  return (
    <div className="filters">
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="location">Location</label>
          <select
            id="location"
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="minPrice">Min Price (QAR)</label>
          <input
            type="number"
            id="minPrice"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="maxPrice">Max Price (QAR)</label>
          <input
            type="number"
            id="maxPrice"
            placeholder="1000"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="sortBy">Sort By</label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="filter-select"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Highest Discount</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <button onClick={onClearFilters} className="btn-clear-filters">
        Clear All Filters
      </button>
    </div>
  )
}

export default Filters
