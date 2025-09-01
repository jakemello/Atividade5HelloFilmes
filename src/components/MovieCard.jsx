import { Link } from 'react-router-dom';
import { imgUrl } from '../services/api.js';
import { useFavorites } from '../hooks/useFavorites.js';
import './MovieCard.css';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';

export default function MovieCard({ movie }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(movie.id);

  function handleFavoriteClick(e) {
    e.preventDefault();
    if (isFav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  return (
    <Link to={`/detalhes/${movie.id}`} className="movie-card">
      <img
        className="movie-thumb"
        src={imgUrl(movie.poster_path, 'w342')}
        alt={movie.title}
        loading="lazy"
      />
      <div className="movie-info">
        <h4 className="movie-title">{movie.title}</h4>
        <div className="movie-extra">
          {}
          <div className="movie-rating">
            <StarIcon />
            <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
          </div>

          <IconButton onClick={handleFavoriteClick} className={`fav-button ${isFav ? 'active' : ''}`}>
            {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
      </div>
    </Link>
  );
}