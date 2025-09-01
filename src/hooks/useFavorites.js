

import { useState, useEffect, useCallback } from 'react';

const KEY = 'helloFilmes_favorites_v1';

export function useFavorites() {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(KEY)) || [];
    setFavorites(storedFavorites);
  }, []);

  const updateFavoritesAndStorage = (updatedList) => {

    setFavorites(updatedList);

    localStorage.setItem(KEY, JSON.stringify(updatedList));
  };

  const addFavorite = (movie) => {
    if (!favorites.some(fav => fav.id === movie.id)) {
      const newList = [...favorites, movie];
      updateFavoritesAndStorage(newList);
    }
  };

  const removeFavorite = (movieId) => {

    const newList = favorites.filter(m => m.id !== movieId);

    updateFavoritesAndStorage(newList);
  };

  const isFavorite = useCallback(
    (movieId) => favorites.some(movie => movie.id === movieId),
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite };
}