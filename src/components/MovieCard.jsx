function MovieCard({ movie }) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/300x450/667eea/ffffff?text=No+Image";

  // Check if movie is already in favorites
  const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const isFavorite = storedFavorites.some((fav) => fav.id === movie.id);

  // Toggle favorite status in localStorage
  function toggleFavorite() {
    let updatedFavorites;
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = storedFavorites.filter((fav) => fav.id !== movie.id);
    } else {
      // Add to favorites
      updatedFavorites = [...storedFavorites, movie];
    }
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    // Reload to reflect change
    window.location.reload();
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={imageUrl}
          alt={movie.title}
        />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">{movie.release_date.substring(0, 4)}</span>
        </div>

        <button className="favorite-button" onClick={toggleFavorite}>
          {isFavorite ? "♥ Remove Favorite" : "♡ Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
