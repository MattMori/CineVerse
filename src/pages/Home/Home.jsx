import { useEffect, useState, } from 'react'
import { MovieService } from '../../api/MovieService'
import MovieCard from '../../components/MovieCard/MovieCard'
import './index.scss'

const Home = ({ movies, loading, searchValueProp }) => {
  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <section className="Home">
      {movies
        .filter((movie) => movie.poster_path && movie.title)  
        .map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
      ))}
    </section>
  )
}

export default Home