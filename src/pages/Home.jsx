import { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";
import { getPopularMovies } from "../services/movieService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function Home({ movies, setMovies }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Only fetch popular movies if no movies already loaded (from search)
  useEffect(() => {
    if (movies.length === 0) {
      async function loadMovies() {
        setLoading(true);
        setError(null);
        try {
          const data = await getPopularMovies();
          setMovies(data);
        } catch (err) {
          setError(err.message || "Failed to load movies");
        } finally {
          setLoading(false);
        }
      }

      loadMovies();
    }
  }, [movies, setMovies]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>Movies</h2>
        <p>Discover and save your favorite films</p>
      </div>

      <MovieGrid movies={movies} />
    </main>
  );
}

export default Home;
