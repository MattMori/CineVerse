import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "3e074b6d14a7158d77bae02b97da066e";
const LANGUAGE = "pt-BR";

const withBaseUrl = (path) => `${BASE_URL}${path}?api_key=${API_KEY}&language=${LANGUAGE}`;


export class MovieService {
    static getMovies() {
      return axios(withBaseUrl("movie/popular"));
    }
  
    static getMovieDetails(id) {
      return axios(withBaseUrl(`movie/${id}`));
    }
    
     
  static searchMovies(movieString) {
    return axios(withBaseUrl("search/movie"), {
      params: {
        query: movieString,
        
      },
    });
  }

  
  }