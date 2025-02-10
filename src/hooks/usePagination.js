import { useState, useEffect } from 'react';
import { MovieService } from '../api/MovieService';

export const usePagination = (initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await MovieService.getMovies(page);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      setError('Erro ao carregar filmes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return {
    currentPage,
    totalPages,
    movies,
    loading,
    error,
    handlePageChange
  };
}; 