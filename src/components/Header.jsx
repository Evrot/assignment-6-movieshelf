import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ onSearch }) {
  const [query, setQuery] = useState('');

  // Update state and call search function when typing
  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">MovieShelf</Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={handleChange}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
