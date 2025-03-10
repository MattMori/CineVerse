import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "3e074b6d14a7158d77bae02b97da066e";
const LANGUAGE = "pt-BR";

const withBaseUrl = (path, params = {}) => {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: LANGUAGE,
    ...params
  });
  
  return `${BASE_URL}${path}?${searchParams.toString()}`;
};

export class MovieService {
    static async getMovies(page = 1) {
      try {
        return await axios(withBaseUrl('movie/popular', { page }));
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
    
    static async searchMovies(query, page = 1) {
      try {
        return await axios(withBaseUrl('search/movie', { query, page }));
      } catch (error) {
        console.error('Erro ao pesquisar filmes:', error);
        throw error;
      }
    }

    static async getMovieVideos(movieId) {
      try {
        const response = await axios(withBaseUrl(`movie/${movieId}/videos`));
        const videos = response.data.results;
        
        const sortedVideos = videos
          .filter(video => 
            (video.site.toLowerCase() === 'youtube' || 
             video.site.toLowerCase() === 'vimeo' ||
             video.site.toLowerCase() === 'dailymotion') &&
            video.key && 
            !video.key.includes('private')
          )
          .sort((a, b) => {
            const typeOrder = {
              'Trailer': 1,
              'Teaser': 2,
              'Clip': 3,
              'Featurette': 4,
              'Behind the Scenes': 5
            };
            
            return (typeOrder[a.type] || 999) - (typeOrder[b.type] || 999);
          });

        return sortedVideos;
      } catch (error) {
        console.error('Erro ao buscar vídeos do filme:', error);
        return []; 
      }
    }

    static async getMoviesByGenre(genreId) {
      try {
        return await axios(withBaseUrl('discover/movie', { with_genres: genreId }));
      } catch (error) {
        console.error('Erro ao buscar filmes por gênero:', error);
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

   static async getNowPlaying() {
    try {
      return await axios(withBaseUrl("movie/now_playing"));
    } catch (error) {
      console.error('Erro ao buscar filmes em cartaz:', error);
      throw error;
    }
  }

   static async getTopRated() {
    try {
      return await axios(withBaseUrl("movie/top_rated"));
    } catch (error) {
      console.error('Erro ao buscar filmes mais bem avaliados:', error);
      throw error;
    }
  }

   static async getGenres() {
    try {
      return await axios(withBaseUrl("genre/movie/list"));
    } catch (error) {
      console.error('Erro ao buscar lista de gêneros:', error);
      throw error;
    }
  }

   static async getMoviesByYear(year) {
    try {
      return await axios(withBaseUrl('discover/movie', {
        primary_release_year: year,
        sort_by: 'popularity.desc'
      }));
    } catch (error) {
      console.error('Erro ao buscar filmes por ano:', error);
      throw error;
    }
  }

  static async getMoviesByActor(personId) {
    try {
      return await axios(withBaseUrl(`discover/movie`, { 
        with_cast: personId,
        sort_by: 'popularity.desc'
      }));
    } catch (error) {
      console.error('Erro ao buscar filmes do ator:', error);
      throw error;
    }
  }

  static async getActorDetails(personId) {
    try {
      return await axios(withBaseUrl(`person/${personId}`));
    } catch (error) {
      console.error('Erro ao buscar detalhes do ator:', error);
      throw error;
    }
  }

  static async getMoviesByCrewMember(personId) {
    try {
      return await axios(withBaseUrl(`discover/movie`, { 
        with_crew: personId,
        sort_by: 'popularity.desc'
      }));
    } catch (error) {
      console.error('Erro ao buscar filmes do profissional:', error);
      throw error;
    }
  }

  static async getMoviesByCompany(companyId) {
    try {
      return await axios(withBaseUrl(`discover/movie`, { 
        with_companies: companyId,
        sort_by: 'popularity.desc'
      }));
    } catch (error) {
      console.error('Erro ao buscar filmes da produtora:', error);
      throw error;
    }
  }

  static async getMoviesWithCombinedFilters(filters) {
    try {
      const params = {};

       switch (filters.type) {
        case 'popular':
          params.sort_by = 'popularity.desc';
          break;
        case 'top_rated':
          params.sort_by = 'vote_average.desc';
          params['vote_count.gte'] = 1000; 
          break;
        case 'now_playing':
          params.sort_by = 'release_date.desc';
          const today = new Date();
          const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
          params['primary_release_date.gte'] = lastMonth.toISOString().split('T')[0];
          params['primary_release_date.lte'] = new Date().toISOString().split('T')[0];
          break;
        case 'upcoming':
          params.sort_by = 'release_date.asc';
          params['primary_release_date.gte'] = new Date().toISOString().split('T')[0];
          break;
        default:
          params.sort_by = 'popularity.desc';
      }

       if (filters.genre) {
        params.with_genres = filters.genre;
      }

      if (filters.year) {
        params.primary_release_year = filters.year;
      }

      return await axios(withBaseUrl('discover/movie', params));
    } catch (error) {
      console.error('Erro ao buscar filmes com filtros combinados:', error);
      throw error;
    }
  }
}
  