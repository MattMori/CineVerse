import { useState, useCallback } from 'react';
import { MovieService } from '../api/MovieService';

export const useFilters = () => {
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: 0,
    sortBy: 'popularity.desc'
  });
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const applyFilters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        with_genres: filters.genre,
        year: filters.year,
        'vote_average.gte': filters.rating,
        sort_by: filters.sortBy
      };

      const response = await MovieService.getMoviesByFilters(params);
      setMovies(response.data.results);
    } catch (err) {
      setError('Erro ao aplicar filtros');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      genre: '',
      year: '',
      rating: 0,
      sortBy: 'popularity.desc'
    });
  };

  return {
    filters,
    loading,
    movies,
    error,
    updateFilter,
    applyFilters,
    clearFilters
  };
}; 