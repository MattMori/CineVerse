import './index.scss'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieService } from "../../api/MovieService";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  async function getMovie() {
    const { data } = await MovieService.getMovieDetails(id);
    setMovie(data);
  }

  useEffect(() => {
    getMovie();
  }, []);

  useEffect(() => {
    console.log(movie);
  });

  return (
    <section className="MovieDetail">
      <div className="MovieDetail__container">
        <div className="MovieDetail__col">
          <h1 className="MovieDetail__title">{movie.title}</h1>
          <div className="MovieDetail__image">
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} loading="lazy"
              alt=""
            />
          </div>
        </div>
        <div className="MovieDetail__col">
          <div className="MovieDetail__details">
            <div className="MovieDetail__detail">
              <span>Orçamento:</span> {movie.budget}
            </div>
            <div className="MovieDetail__detail">
              <span>Lingua Original:</span> {movie.original_language}
            </div>
            <div className="MovieDetail__detail">
              <span>Data de Lançamento:</span> {movie.release_date}
            </div>
            <div className="MovieDetail__detail">
              <span>Popularidade:</span> {movie.popularity}
            </div>
            <div className="MovieDetail__detail">
              <span>Descrição:</span> {movie.overview}
            </div>
          </div>
          <Link to={"/"} className="MovieDetail__button">
            Voltar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;