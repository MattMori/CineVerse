import './Pagination.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="Pagination">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>
      
      <span className="Pagination__info">
        Página {currentPage} de {totalPages}
      </span>
      
      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Próxima
      </button>
    </div>
  );
};

export default Pagination; 