import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { MovieService } from '../../api/MovieService';
import MovieCard from '../MovieCard/MovieCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './TrendingSection.scss';

const NextArrow = ({ onClick }) => (
  <button className="TrendingSection__arrow next" onClick={onClick}>
    <FaChevronRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button className="TrendingSection__arrow prev" onClick={onClick}>
    <FaChevronLeft />
  </button>
);

const TrendingSection = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await MovieService.getTrending(timeWindow);
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar tendências:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [timeWindow]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="TrendingSection">
      <div className="TrendingSection__header">
        <h2>Em Tendência</h2>
        <div className="TrendingSection__toggle">
          <button 
            className={timeWindow === 'day' ? 'active' : ''}
            onClick={() => setTimeWindow('day')}
          >
            Hoje
          </button>
          <button 
            className={timeWindow === 'week' ? 'active' : ''}
            onClick={() => setTimeWindow('week')}
          >
            Esta Semana
          </button>
        </div>
      </div>

      <div className="TrendingSection__carousel">
        {loading ? (
          <div className="TrendingSection__loading">Carregando...</div>
        ) : (
          <Slider {...settings}>
            {trendingMovies.map(movie => (
              <div key={movie.id} className="TrendingSection__slide">
                <MovieCard movie={movie} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default TrendingSection; 