import { useState } from 'react';
import './AdvancedFilters.scss';

const AdvancedFilters = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    voteAverage: 0,
    releaseYear: '',
    withGenres: [],
    sortBy: 'popularity.desc'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  return (
    <form className="AdvancedFilters" onSubmit={handleSubmit}>
      <div className="AdvancedFilters__group">
        <label>Nota Mínima</label>
        <input 
          type="range" 
          min="0" 
          max="10" 
          step="0.5"
          value={filters.voteAverage}
          onChange={(e) => setFilters({...filters, voteAverage: e.target.value})}
        />
        <span>{filters.voteAverage}</span>
      </div>

      <div className="AdvancedFilters__group">
        <label>Ordenar por</label>
        <select 
          value={filters.sortBy}
          onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
        >
          <option value="popularity.desc">Mais Populares</option>
          <option value="vote_average.desc">Melhor Avaliados</option>
          <option value="release_date.desc">Mais Recentes</option>
          <option value="revenue.desc">Maior Bilheteria</option>
        </select>
      </div>

      <button type="submit">Aplicar Filtros</button>
    </form>
  );
};

export default AdvancedFilters; 