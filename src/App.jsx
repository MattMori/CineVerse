import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home/Home.jsx";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import './index.scss';
import { MovieService } from "./api/MovieService.js";
function App() {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Função para buscar dados da API ao montar o componente
    const fetchMovies = async () => {
      try {
        const response = await MovieService.getMovies(); // Chama o método para obter a lista de filmes da API
        setMovies(response.data.results); // Define os dados da API no estado
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchMovies(); // Chama a função de busca quando o componente é montado
  }, []); // Dependência vazia para garantir que a função seja chamada apenas uma vez

  return (
    <div className="App">
      <Header onSubmit={(inputValue) => setSearchValue(inputValue)} />
      <Routes>
        <Route path="/" element={<Home movies={movies} searchValueProp={searchValue} />} />
        {/* Mapeia os detalhes do filme e cria rotas dinâmicas com base nos dados da API */}
        {movies.map((movie) => (
          <Route key={movie.id} path={`/movie/${movie.id}`} element={<MovieDetail movie={movie} />} />
        ))}
      </Routes>
    </div>
  );
}
export default App;