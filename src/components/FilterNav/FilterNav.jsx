import { useEffect, useState } from 'react';
import { MovieService } from '../../api/MovieService';
import './FilterNav.scss';

const FilterNav = ({ onFilterChange }) => {
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

  return (
    <nav className="FilterNav">
      <div className="FilterNav__section">
        <button onClick={() => onFilterChange('popular')}>Populares</button>
        <button onClick={() => onFilterChange('now_playing')}>Em Cartaz</button>
        <button onClick={() => onFilterChange('top_rated')}>Mais Bem Avaliados</button>
        <button onClick={() => onFilterChange('upcoming')}>Próximos Lançamentos</button>
      </div>

      <div className="FilterNav__section">
        <select onChange={(e) => onFilterChange('genre', e.target.value)}>
          <option value="">Selecione um Gênero</option>
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
          <option value="">Selecione um Ano</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default FilterNav; 