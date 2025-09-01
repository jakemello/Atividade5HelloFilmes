

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/';

if (!API_KEY) {
  console.error('⚠️ VITE_TMDB_API_KEY não foi encontrada no arquivo .env.');

  throw new Error("API Key do TMDB não configurada. Verifique seu arquivo .env");
}

async function request(path, params = {}){
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'pt-BR');
  Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, v));

  const res = await fetch(url);
  if(!res.ok){
    const text = await res.text();

    try {
      const errorJson = JSON.parse(text);
      throw new Error(`Erro ${res.status}: ${errorJson.status_message}`);
    } catch {
      throw new Error(`Erro ${res.status}: ${text}`);
    }
  }
  return res.json();
}

export function imgUrl(path, size='w500'){
  if(!path) return 'https://via.placeholder.com/500x750?text=Sem+Imagem';
  return `${IMG_BASE}${size}${path}`;
}

export function getPopular(page=1){ return request('/movie/popular', { page }); }
export function searchMovies(query, page=1){ return request('/search/movie', { query, page }); }
export function getMovieDetails(id){ return request(`/movie/${id}`); }
export function getMovieCredits(id){ return request(`/movie/${id}/credits`); }