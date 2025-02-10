import { useState, useEffect } from 'react';

export const useViewHistory = () => {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('viewHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('viewHistory', JSON.stringify(history));
  }, [history]);

  const addToHistory = (movie) => {
    setHistory(prev => {
      const filtered = prev.filter(m => m.id !== movie.id);
      return [movie, ...filtered].slice(0, 20); // Mantém apenas os últimos 20
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addToHistory, clearHistory };
}; 