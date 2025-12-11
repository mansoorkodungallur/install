import './OfferCard.css'

function OfferCard({ offer }) {
  return (
    <div className="offer-card">
      <div className="offer-image-wrapper">
        <img src={offer.image} alt={offer.title} className="offer-image" />
        <div className="offer-discount-badge">-{offer.discount}%</div>
        <div className="offer-category-badge">{offer.category}</div>
      </div>
      
      <div className="offer-content">
        <h3 className="offer-title">{offer.title}</h3>
        <p className="offer-description">{offer.description}</p>
        
        <div className="offer-location">
          <svg
            className="location-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{offer.location}</span>
        </div>

        <div className="offer-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(offer.rating) ? 'star filled' : 'star'}>
                ★
              </span>
            ))}
            <span className="rating-value">{offer.rating}</span>
          </div>
          <span className="review-count">({offer.reviewCount} reviews)</span>
        </div>

        <div className="offer-footer">
          <div className="offer-price">
            <span className="price-original">QAR {offer.originalPrice}</span>
            <span className="price-current">QAR {offer.price}</span>
          </div>
          <button className="btn-buy">Buy Now</button>
        </div>

        <div className="offer-validity">
          Valid until: {new Date(offer.validUntil).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  )
}

export default OfferCard
