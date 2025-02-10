import { Link } from 'react-router-dom';
import './index.scss';
import { FaStar, FaCalendarAlt } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const [year] = date.split('-');
    return year;
  };

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const posterPath = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.jpg';

  return (
    <Link to={`/movie/${movie.id}`} className="MovieCard">
      <div className="MovieCard__image">
        <img
          src={posterPath}
          alt={movie.title}
          loading="lazy"
        />
        <div className="MovieCard__overlay">
          <div className="MovieCard__info">
            <div className="MovieCard__rating">
              <FaStar />
              <span>{formatRating(movie.vote_average)}</span>
            </div>
            <div className="MovieCard__year">
              <FaCalendarAlt />
              <span>{formatDate(movie.release_date)}</span>
            </div>
          </div>
          <p className="MovieCard__overview">
            {movie.overview || 'Sinopse não disponível.'}
          </p>
        </div>
      </div>
      <div className="MovieCard__content">
        <h2 className="MovieCard__title">{movie.title}</h2>
      </div>
    </Link>
  );
};

export default MovieCard;
