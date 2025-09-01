import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Container, Button, Link as MuiLink, IconButton, Menu, MenuItem } from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import Slider from "react-slick";
import { getPopular, imgUrl } from "../services/api.js";
import { useFavorites } from "../hooks/useFavorites.js";

import HelloFilmesLogo from '../components/images/HelloFilmes.png';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const [filmes, setFilmes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedSynopsis, setExpandedSynopsis] = useState({}); // Lógica da sinopse de volta
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const isTransparentNav = !isScrolled && location.pathname === "/";
  const navLinks = [
    { text: 'Início', path: '/' },
    { text: 'Buscar', path: '/buscar' },
    { text: 'Favoritos', path: '/favoritos' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      async function carregarFilmes() {
        try {
          const data = await getPopular(1);
          setFilmes(data.results.slice(0, 10));
        } catch (err) {
          console.error("Erro ao buscar filmes", err);
        }
      }
      carregarFilmes();
    }
  }, [location.pathname]);
  
  const toggleSynopsis = (movieId) => {
    setExpandedSynopsis(prev => ({ ...prev, [movieId]: !prev[movieId] }));
  };

  const settings = {
    dots: false, infinite: true, speed: 800, slidesToShow: 1, slidesToScroll: 1,
    autoplay: true, autoplaySpeed: 4000, pauseOnHover: true, arrows: false,
    afterChange: (current) => setActiveIndex(current),
  };

  const bgImageUrl = filmes.length > 0 ? imgUrl(filmes[activeIndex]?.backdrop_path) : "";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: isTransparentNav ? "transparent" : "#e67bceec",
          boxShadow: isTransparentNav ? "none" : 3,
          transition: "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
        }}
      >
        <Toolbar>
          <MuiLink component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img 
              src={HelloFilmesLogo} 
              alt="HelloFilmes Logo" 
              style={{ height: '50px', width: 'auto', marginRight: '8px' }} 
            />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: "bold", fontFamily: "'Comic Sans MS', cursive, sans-serif",
                color: '#ffffff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                fontSize: { xs: '1.5rem', sm: '2.125rem' },
              }}
            >
              HelloFilmes
            </Typography>
          </MuiLink>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navLinks.map((item) => (
              <Button 
                key={item.text} component={NavLink} to={item.path}
                sx={{ 
                  color: 'white', fontWeight: 'bold', transition: 'transform 0.2s ease-in-out, color 0.2s ease-in-out',
                  borderRadius: '20px', px: 2,
                  '&:hover': { color: '#FFD700', transform: 'scale(1.1)' },
                  '&.active': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton size="large" edge="end" color="inherit" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              {navLinks.map((item) => (
                <MenuItem key={item.text} component={NavLink} to={item.path} onClick={handleMenuClose}>
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box component="main">
        {location.pathname === "/" && (
          <Box
            sx={{
              position: "relative", minHeight: '80vh', py: 8, textAlign: "center",
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundImage: `url(${bgImageUrl})`, backgroundSize: "cover", backgroundPosition: "center",
              transition: "background-image 0.5s ease-in-out",
              "&::before": {
                content: '""', position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 1,
              },
            }}
          >
            <Container sx={{ position: "relative", zIndex: 2 }}>
              <Typography variant="h4" sx={{ 
                fontWeight: "bold", color: "#ffffff", fontFamily: "'Comic Sans MS', cursive, sans-serif", 
                mb: 4, textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                fontSize: { xs: '1.8rem', sm: '2.5rem' }
              }}>
                Top Filmes da Semana
              </Typography>
              <Slider {...settings}>
                {filmes.map((filme) => {
                  const isFav = isFavorite(filme.id);
                  const isExpanded = expandedSynopsis[filme.id];
                  const synopsisText = filme.overview;
                  const synopsisLimit = 150;
                  const isLongSynopsis = synopsisText.length > synopsisLimit;
                  
                  return (
                    <Box key={filme.id} sx={{ px: { xs: 1, sm: 2 } }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', maxWidth: 450, mx: 'auto' }}>
                        <Link to={`/detalhes/${filme.id}`}>
                          <img src={imgUrl(filme.poster_path)} alt={filme.title} style={{ 
                            borderRadius: "12px", boxShadow: "0 8px 16px rgba(0,0,0,0.5)", 
                            marginBottom: '16px', maxWidth: '200px', width: '60vw', height: 'auto'
                          }} />
                        </Link>
                        <Typography variant="h5" sx={{ 
                          fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }}>
                          {filme.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                          <StarIcon sx={{ color: 'gold', mr: 1 }} />
                          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                            {filme.vote_average.toFixed(1)}
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" sx={{ 
                          my: 2, textAlign: 'center', height: isExpanded ? 'auto' : '60px', 
                          overflow: 'hidden', display: { xs: 'none', sm: 'block' } 
                        }}>
                          {synopsisText}
                        </Typography>
                        {isLongSynopsis && (
                          <Button 
                            size="small" 
                            onClick={() => toggleSynopsis(filme.id)} 
                            sx={{ 
                              color: '#ffb6c1', textTransform: 'none', mb: 2, 
                              display: { xs: 'none', sm: 'block' } 
                            }}
                          >
                            {isExpanded ? 'Ver menos' : 'Ver mais...'}
                          </Button>
                        )}

                        <Button variant="contained" onClick={() => isFav ? removeFavorite(filme.id) : addFavorite(filme)} startIcon={isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />} sx={{ bgcolor: '#d018d6', color: '#ffff', fontWeight: 'bold', '&:hover': { bgcolor: '#e67bceec' } }}>
                          {isFav ? 'Remover Favorito' : 'Adicionar Favorito'}
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Slider>
            </Container>
          </Box>
        )}
      </Box>
    </Box>
  );
}