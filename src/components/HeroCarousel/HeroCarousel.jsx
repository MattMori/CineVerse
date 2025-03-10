import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { MovieService } from '../../api/MovieService';
import { FaPlay } from 'react-icons/fa';
import './HeroCarousel.scss';

const HeroCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await MovieService.getNowPlaying();
        setMovies(response.data.results.slice(0, 5)); 
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    arrows: false
  };

  if (loading) {
    return <div className="HeroCarousel__loading">Carregando...</div>;
  }

  return (
    <div className="HeroCarousel">
      <Slider {...settings}>
        {movies.map(movie => (
          <div key={movie.id} className="HeroCarousel__slide">
            <div className="HeroCarousel__image">
              <img 
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
              />
              <div className="HeroCarousel__overlay" />
            </div>
            <div className="HeroCarousel__content">
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>
              <Link to={`/movie/${movie.id}`} className="HeroCarousel__button">
                <FaPlay /> Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel; 