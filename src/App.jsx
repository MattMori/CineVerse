import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home/Home.jsx";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import './index.scss';
import { MovieService } from "./api/MovieService.js";
import HeroCarousel from './components/HeroCarousel/HeroCarousel';

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleFilterChange = async (filterType, value) => {
    setLoading(true);
    try {
      let response;
      
      switch (filterType) {
        case 'popular':
          response = await MovieService.getMovies();
          break;
        case 'now_playing':
          response = await MovieService.getNowPlaying();
          break;
        case 'top_rated':
          response = await MovieService.getTopRated();
          break;
        case 'upcoming':
          response = await MovieService.getUpcomingMovies();
          break;
        case 'genre':
          if (value) {
            response = await MovieService.getMoviesByGenre(value);
          }
          break;
        case 'year':
          if (value) {
            response = await MovieService.getMoviesByYear(value);
          }
          break;
        case 'actor':
          if (value) {
            response = await MovieService.getMoviesByActor(value);
          }
          break;
        case 'crew':
          if (value) {
            response = await MovieService.getMoviesByCrewMember(value);
          }
          break;
        case 'company':
          if (value) {
            response = await MovieService.getMoviesByCompany(value);
          }
          break;
        case 'combined':
          if (value) {
            response = await MovieService.getMoviesWithCombinedFilters(value);
          }
          break;
        default:
          response = await MovieService.getMovies();
      }

      if (response) {
        setMovies(response.data.results);
      }
    } catch (error) {
      console.error('Erro ao aplicar filtro:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        if (searchValue) {
          const response = await MovieService.searchMovies(searchValue);
          setMovies(response.data.results);
        } else {
          const response = await MovieService.getMovies();
          setMovies(response.data.results);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchValue]);

  useEffect(() => {
    if (location.state?.filterType && location.state?.value) {
      handleFilterChange(location.state.filterType, location.state.value);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="App">
      <Header 
        onSubmit={(inputValue) => setSearchValue(inputValue)}
        onFilterChange={handleFilterChange}
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <HeroCarousel />
              <Home 
                movies={movies} 
                loading={loading} 
                searchValueProp={searchValue} 
              />
            </>
          } 
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
