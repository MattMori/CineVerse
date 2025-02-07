import './ErrorMessage.scss';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="ErrorMessage">
      <p>{message || 'Ocorreu um erro ao carregar os dados.'}</p>
      {onRetry && (
        <button onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  );
};

export default ErrorMessage; 