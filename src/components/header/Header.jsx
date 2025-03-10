import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MovieService } from '../../api/MovieService';
import { FaFilm, FaFilter } from 'react-icons/fa';
import './index.scss';

const Header = ({ onSubmit, onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    genre: '',
    year: '',
    type: 'popular'  
  });
  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  const applyFilters = () => {
    onFilterChange('combined', activeFilters);
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev, [filterType]: value };
      return newFilters;
    });
  };

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

  useEffect(() => {
    applyFilters();
  }, [activeFilters]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchValue = event.target[0].value;
    onSubmit(searchValue);
    event.target[0].value = "";
  };

  const handleLogoClick = () => {
    const searchInput = document.querySelector('.search-form input');
    if (searchInput) {
      searchInput.value = '';
    }
    
    setActiveFilters({
      genre: '',
      year: '',
      type: 'popular'
    });
    
    onFilterChange('popular');
    
    setIsFilterOpen(false);
  };

  return (
    <header className="Header">
      <div className="Header__main">
        <Link to="/" className="logo" onClick={handleLogoClick}>
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
          <button 
            onClick={() => handleFilterChange('type', 'popular')}
            className={activeFilters.type === 'popular' ? 'active' : ''}
          >
            Populares
          </button>
          <button 
            onClick={() => handleFilterChange('type', 'now_playing')}
            className={activeFilters.type === 'now_playing' ? 'active' : ''}
          >
            Em Cartaz
          </button>
          <button 
            onClick={() => handleFilterChange('type', 'top_rated')}
            className={activeFilters.type === 'top_rated' ? 'active' : ''}
          >
            Mais Bem Avaliados
          </button>
          <button 
            onClick={() => handleFilterChange('type', 'upcoming')}
            className={activeFilters.type === 'upcoming' ? 'active' : ''}
          >
            Lançamentos
          </button>
        </div>

        <div className="Header__filters-selects">
          <select 
            value={activeFilters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
          >
            <option value="">Gênero</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <select 
            value={activeFilters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
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