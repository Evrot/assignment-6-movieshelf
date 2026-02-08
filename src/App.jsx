import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { getPopularMovies, searchMovies } from './services/movieService';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  // Load popular movies initially
  useEffect(() => {
    async function loadPopular() {
      const data = await getPopularMovies();
      setMovies(data);
    }
    loadPopular();
  }, []);

  // Function to handle search
  async function handleSearch(query) {
    if (!query) {
      // If search is empty, reload popular movies
      const data = await getPopularMovies();
      setMovies(data);
      return;
    }

    const results = await searchMovies(query);
    setMovies(results);
  }

  return (
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} />

        <Routes>
          <Route path="/" element={<Home movies={movies} setMovies={searchMovies}/>} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
