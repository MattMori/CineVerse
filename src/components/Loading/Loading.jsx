import './Loading.scss';

const Loading = ({ size = 'medium', text = 'Carregando...' }) => {
  return (
    <div className={`Loading Loading--${size}`}>
      <div className="Loading__spinner">
        <div className="Loading__spinner-inner"></div>
      </div>
      {text && <p className="Loading__text">{text}</p>}
    </div>
  );
};

export default Loading; 