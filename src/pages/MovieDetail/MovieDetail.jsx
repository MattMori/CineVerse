import './index.scss'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieService } from "../../api/MovieService";

const MovieDetail = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  async function getMovie() {
    try {
      setLoading(true);
      const data = await MovieService.getMovieDetails(id);
      setMovie(data);
      setCredits(data.credits);
    } catch (error) {
      setError('Erro ao carregar detalhes do filme');
    } finally {
      setLoading(false);
    }
  }

  async function getMovieVideos() {
    try {
      const { data } = await MovieService.getMovieVideos(id);
      // Filtrar apenas os vídeos do YouTube
      const youtubeVideos = data.results.filter(
        (video) => video.site === "YouTube"
      );
      setVideos(youtubeVideos);
    } catch (error) {
      console.error("Erro ao buscar vídeos do filme:", error);
    }
  }


  useEffect(() => {
    getMovie();
    getMovieVideos();
  }, [id]);

  function formatarDataBrasileira(data) {
    const dataObjeto = new Date(data);
    const dia = dataObjeto.getDate().toString().padStart(2, '0');
    const mes = (dataObjeto.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObjeto.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  function formatarNumero(Flutuante) {
    return parseFloat(Flutuante).toFixed(1);
  }

  function converterSiglaParaNomeLingua(sigla) {
    // Objeto de mapeamento das siglas para nomes de línguas
    const mapeamentoSiglasNomes = {
      en: 'Inglês',
      es: 'Espanhol',
      fr: 'Francês',
      de: 'Alemão',
      it: 'Italiano',
      ja: 'Japonês',
      'zh-CN': 'Chinês (Mandarim)',
      'zh-TW': 'Chinês (Taiwanês)',
      hi: 'Hindi',
      ru: 'Russo',
      ko: 'Coreano',
      ar: 'Árabe',
      pt: 'Português',
      sv: 'Sueco',
      nl: 'Holandês',
      tr: 'Turco',
      el: 'Grego',
      th: 'Tailandês',
      he: 'Hebraico',
      da: 'Dinamarquês',
      no: 'Norueguês',
      fi: 'Finlandês',
      pl: 'Polonês',
      hu: 'Húngaro',
      cs: 'Tcheco',
      ro: 'Romeno',
      fa: 'Persa',
      bn: 'Bengali',
      mr: 'Marathi',
      te: 'Telugu',
      kn: 'Kannada',
      // Adicione mais correspondências conforme necessário
    };

    // Verifica se a sigla existe no mapeamento e retorna a correspondência ou 'Desconhecido' se não existir
    return mapeamentoSiglasNomes[sigla] || 'Desconhecido';
  }

  const orcamentoFormatado = movie.budget ? `R$ ${movie.budget.toLocaleString('pt-BR')}` : 'N/A';

  return (
    <section className="MovieDetail">
      {loading ? (
        <div className="loading-spinner">Carregando...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="MovieDetail__container">
            <div className="MovieDetail__col">
            <Link to={"/"} className="MovieDetail__button">
                Voltar
              </Link>
              <h1 className="MovieDetail__title">{movie.title}</h1>
              <div className="MovieDetail__image">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt=""
                />
              </div>
            </div>
            <div className="MovieDetail__col">
              <div className="MovieDetail__details">
                <div className="MovieDetail__detail">
                  <span>Sub Titulo:</span> {movie.tagline}
                </div>
                <div className="MovieDetail__detail">
                  <span>Gênero:</span> {movie.genres ? movie.genres.map(genre => genre.name).join(', ') : 'N/A'}
                </div>
                <div className="MovieDetail__detail">
                  <span>Orçamento:</span> {orcamentoFormatado}
                </div>
                <div className="MovieDetail__detail">
                  <span>Língua Original:</span> {converterSiglaParaNomeLingua(movie.original_language)}
                </div>
                <div className="MovieDetail__detail">
                  <span>Data de Lançamento:</span> {formatarDataBrasileira(movie.release_date)}
                </div>
                <div className="MovieDetail__detail">
                  <span>Popularidade:</span> {formatarNumero(movie.popularity)}
                </div>
                <div className="MovieDetail__detail">
                  <span>votos</span>{formatarNumero(movie.vote_average)}/10
                </div>
                <div className="MovieDetail__detail">
                  <span>Descrição:</span> {movie.overview}
                </div>

              </div>
              
            </div>
            <div className="MovieDetail__cast">
              <h2>Elenco Principal</h2>
              <div className="cast-list">
                {credits.cast?.slice(0, 6).map((actor) => (
                  <div key={actor.id} className="cast-item">
                    <img
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt={actor.name}
                      onError={(e) => {
                        e.target.src = '/placeholder-actor.png';
                      }}
                    />
                    <h3>{actor.name}</h3>
                    <p>{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="MovieDetail__videos">
            <h2>Trailers e Vídeos</h2>
            <div className="video-grid">
              {videos.length > 0 ? (
                videos.slice(0, 4).map((video) => (
                  <div key={video.id} className="video-card">
                    <h3>{video.name}</h3>
                    <div className="video-wrapper">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ))
              ) : (
                <p>Nenhum vídeo disponível</p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MovieDetail;