

import { useFavorites } from '../hooks/useFavorites.js';
import MovieCard from '../components/MovieCard.jsx';

import { Container, Typography, Grid, Box } from '@mui/material';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (

    <Container sx={{ py: 6, bgcolor: '#ffffff', minHeight: '100vh' }}>

      {}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 'bold',
          mb: 5, 
          color: '#c71585', 
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
        }}
      >
        Meus Filmes Favoritos
      </Typography>

      {favorites.length === 0 ? (

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Typography variant="h6" color="text.secondary">
            Você ainda não favoritou nenhum filme.
          </Typography>
        </Box>
      ) : (

        <Grid container spacing={3}>
          {favorites.map(movie => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}