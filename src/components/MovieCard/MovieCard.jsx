import { Link } from 'react-router-dom';
import './index.scss';
 
const MovieCard = ({ movie }) => {
 
  function formatarNumero(Flutuante) {
    return parseFloat(Flutuante).toFixed(1);
  }

  function formatarDataBrasileira(data) {
    const dataObjeto = new Date(data);
    const dia = dataObjeto.getDate().toString().padStart(2, '0');
    const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObjeto.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }
  return (
    <Link to={`/movie/${movie.id}`} className='btn-details'>
    <div className='MovieCard'>
      <div className='movie-image'>
        <img src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} alt={movie.title} aria-label="ver detalhes" />
      </div>
      <div className='movie-description'>
        <h3>{movie.title}</h3>
        <span>{formatarNumero(movie.vote_average)}/10 || {formatarDataBrasileira(movie.release_date)}</span>
      </div>
    </div> </Link>
  );
};

export default MovieCard;
