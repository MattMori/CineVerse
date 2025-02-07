import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import FilterNav from "./components/FilterNav/FilterNav";
import Home from "./pages/Home/Home.jsx";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import './index.scss';
import { MovieService } from "./api/MovieService.js";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="App">
      <Header onSubmit={(inputValue) => setSearchValue(inputValue)} />
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <FilterNav onFilterChange={handleFilterChange} />
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