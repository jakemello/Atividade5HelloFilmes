import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, imgUrl } from '../services/api.js';
import { useFavorites } from '../hooks/useFavorites';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import './Details.css';

import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [movieData, creditsData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id)
        ]);
        setMovie(movieData);
        setCredits(creditsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  const director = credits?.crew.find(person => person.job === 'Director');

  return (
    <div className="movie-details-container">
      <div className="details-header" style={{ backgroundImage: `url(${imgUrl(movie.backdrop_path, 'original')})` }}>
        <div className="details-overlay">
          <div className="container details-content">
            <img src={imgUrl(movie.poster_path, 'w500')} alt={movie.title} className="details-poster" />
            <div className="details-info">
              <h1>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
              <div className="facts">
                {}
              </div>
              <p className="tagline">{movie.tagline}</p>
              <h3>Sinopse</h3>
              <p className="overview">{movie.overview}</p>

              {director && <p><strong>Diretor:</strong> {director.name}</p>}

              <div className="cast-section">
                <h2>Elenco Principal</h2>
                <div className="cast-scroll-container">
                  {credits?.cast?.slice(0, 15).map((actor) => (
                    <div key={actor.cast_id} className="cast-card">
                      <img 
                        src={imgUrl(actor.profile_path, 'w185')} 
                        alt={actor.name} 
                      />
                      <div className="cast-card-info">
                        <strong>{actor.name}</strong>
                        <span>{actor.character}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {}
              <Button
                onClick={() => isFav ? removeFavorite(movie.id) : addFavorite(movie)}
                variant="contained"
                startIcon={isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                sx={{
                  marginTop: '20px',
                  bgcolor: '#d018d6',
                  color: '#ffff',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: '#e67bceec',
                  },
                }}
              >
                {isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}