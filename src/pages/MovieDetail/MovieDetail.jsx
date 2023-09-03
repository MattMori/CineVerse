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
      <div className="MovieDetail__container">
        <div className="MovieDetail__col">
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
          <Link to={"/"} className="MovieDetail__button">
            Voltar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;