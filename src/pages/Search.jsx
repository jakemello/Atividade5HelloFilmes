import { useState } from "react";
import { searchMovies } from "../services/api.js";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Pagination,
} from "@mui/material";

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (currentPage = 1) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setMovies([]);
    setPage(currentPage);
    
    try {
      const data = await searchMovies(query, currentPage);
      if (data.results.length === 0) {
        setError(`Nenhum filme encontrado para "${query}". Tente outro termo!`);
      }
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err.message);
      setMovies([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(1);
  };

  const handlePageChange = (event, value) => {
    handleSearch(value);
  };

  return (
    <Container sx={{ py: 6, bgcolor: "#ffffff", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 4, color: "#c71585", fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>
        Busque por Filmes
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
        <TextField variant="outlined" placeholder="Digite o nome do filme..." value={query} onChange={(e) => setQuery(e.target.value)} sx={{ width: "60%", '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#cccccc' }, '&:hover fieldset': { borderColor: '#e67bceec' }, '&.Mui-focused fieldset': { borderColor: '#c71585' } } }} />
        <Button type="submit" variant="contained" sx={{ bgcolor: "#ff69b4", color: "#ffff", "&:hover": { bgcolor: "#e67bceec" } }}>
          Buscar
        </Button>
      </Box>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {!loading && !error && totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            disabled={loading}
            color="secondary"
            sx={{
              '& .MuiPaginationItem-root:hover': {
                backgroundColor: 'rgba(230, 123, 206, 0.15)',
              },

              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#d018d6',
                color: '#ffff',
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