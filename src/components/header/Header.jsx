import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MovieService } from '../../api/MovieService';
import { FaFilm, FaFilter } from 'react-icons/fa';
import './index.scss';

const Header = ({ onSubmit, onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const { data } = await MovieService.getGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
      }
    };
    loadGenres();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchValue = event.target[0].value;
    onSubmit(searchValue);
    event.target[0].value = "";
  };

  return (
    <header className="Header">
      <div className="Header__main">
        <Link to="/" className="logo">
          <h1>
            <FaFilm />
            Cine<span>Verse</span>
          </h1>
        </Link>
        
        <form onSubmit={handleSubmit} className="search-form">
          <input 
            type="text" 
            placeholder="Buscar filmes..." 
            aria-label="Buscar filmes"
          />
        </form>
      </div>

      <button 
        className="Header__filter-toggle"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <FaFilter /> Filtros
      </button>

      <div className={`Header__filters ${isFilterOpen ? 'active' : ''}`}>
        <div className="Header__filters-buttons">
          <button onClick={() => onFilterChange('popular')}>Populares</button>
          <button onClick={() => onFilterChange('now_playing')}>Em Cartaz</button>
          <button onClick={() => onFilterChange('top_rated')}>Mais Bem Avaliados</button>
          <button onClick={() => onFilterChange('upcoming')}>Lançamentos</button>
        </div>

        <div className="Header__filters-selects">
          <select onChange={(e) => onFilterChange('genre', e.target.value)}>
            <option value="">Gênero</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <select 
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              onFilterChange('year', e.target.value);
            }}
          >
            <option value="">Ano</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;