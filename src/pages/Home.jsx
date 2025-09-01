import { useState, useEffect } from 'react';
import { getPopular } from '../services/api.js';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Box, Container, Grid, Pagination, Typography } from '@mui/material';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getPopular(page)
      .then(data => {
        setMovies(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <Loader />;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Filmes Populares
      </Typography>

      {error && <ErrorMessage message={error} />}

      <Grid container spacing={4}>
        {movies.map(movie => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4, mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="secondary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#ffffff',
              },
              '& .MuiPaginationItem-root:not(.Mui-selected):hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#d018d6',
                color: '#ffff',
                fontWeight: 'bold',
              },
              '& .MuiPaginationItem-root.Mui-selected:hover': {
                backgroundColor: '#e67bceec',
              }
            }}
          />
        </Box>
      )}
    </Container>
  );
}