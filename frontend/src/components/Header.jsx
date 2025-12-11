import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>Doha Offers</h1>
          </div>
          <nav className="nav">
            <a href="#offers" className="nav-link active">Offers</a>
            <a href="#categories" className="nav-link">Categories</a>
            <a href="#about" className="nav-link">About</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
