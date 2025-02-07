import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "3e074b6d14a7158d77bae02b97da066e";
const LANGUAGE = "pt-BR";

const withBaseUrl = (path) => `${BASE_URL}${path}?api_key=${API_KEY}&language=${LANGUAGE}`;


export class MovieService {
    static async getMovies(page = 1) {
      try {
        return await axios(withBaseUrl(`movie/popular&page=${page}`));
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        throw error;
      }
    }
  
    static async getMovieDetails(id) {
      try {
        const [movieDetails, credits] = await Promise.all([
          axios(withBaseUrl(`movie/${id}`)),
          axios(withBaseUrl(`movie/${id}/credits`))
        ]);
        return {
          ...movieDetails.data,
          credits: credits.data
        };
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
        throw error;
      }
    }
    
     
  static async searchMovies(movieString, page = 1) {
    try {
      return await axios(withBaseUrl("search/movie") + `&query=${encodeURIComponent(movieString)}&page=${page}`);
    } catch (error) {
      console.error('Erro ao pesquisar filmes:', error);
      throw error;
    }
  }

  static async getMovieVideos(id) {
    try {
      return await axios(withBaseUrl(`movie/${id}/videos`));
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
      throw error;
    }
  }

  static async getUpcomingMovies() {
    try {
      return await axios(withBaseUrl("movie/upcoming"));
    } catch (error) {
      console.error('Erro ao buscar próximos lançamentos:', error);
      throw error;
    }
  }

  // Filmes em cartaz nos cinemas
  static async getNowPlaying() {
    try {
      return await axios(withBaseUrl("movie/now_playing"));
    } catch (error) {
      console.error('Erro ao buscar filmes em cartaz:', error);
      throw error;
    }
  }

  // Filmes mais bem avaliados
  static async getTopRated() {
    try {
      return await axios(withBaseUrl("movie/top_rated"));
    } catch (error) {
      console.error('Erro ao buscar filmes mais bem avaliados:', error);
      throw error;
    }
  }

  // Filmes similares baseado em um ID
  static async getSimilarMovies(movieId) {
    try {
      return await axios(withBaseUrl(`movie/${movieId}/similar`));
    } catch (error) {
      console.error('Erro ao buscar filmes similares:', error);
      throw error;
    }
  }

  // Recomendações de filmes baseado em um ID
  static async getMovieRecommendations(movieId) {
    try {
      return await axios(withBaseUrl(`movie/${movieId}/recommendations`));
    } catch (error) {
      console.error('Erro ao buscar recomendações:', error);
      throw error;
    }
  }

  // Reviews do filme
  static async getMovieReviews(movieId) {
    try {
      return await axios(withBaseUrl(`movie/${movieId}/reviews`));
    } catch (error) {
      console.error('Erro ao buscar reviews:', error);
      throw error;
    }
  }

  // Filmes por gênero
  static async getMoviesByGenre(genreId) {
    try {
      return await axios(withBaseUrl("discover/movie") + `&with_genres=${genreId}`);
    } catch (error) {
      console.error('Erro ao buscar filmes por gênero:', error);
      throw error;
    }
  }

  // Lista de gêneros disponíveis
  static async getGenres() {
    try {
      return await axios(withBaseUrl("genre/movie/list"));
    } catch (error) {
      console.error('Erro ao buscar lista de gêneros:', error);
      throw error;
    }
  }

  // Buscar filmes por ano
  static async getMoviesByYear(year) {
    try {
      return await axios(withBaseUrl("discover/movie") + `&year=${year}`);
    } catch (error) {
      console.error('Erro ao buscar filmes por ano:', error);
      throw error;
    }
  }
}
  