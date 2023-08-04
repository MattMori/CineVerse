import { Link } from 'react-router-dom';
import './index.scss'
const Header = (props) => {
  function handleSubmit(event) {
    event.preventDefault();
    const searchValue = event.target[0].value;
    props.onSubmit(searchValue);
    event.target[0].value = "";
  }
  function handleInputChange(event) {
    const searchValue = event.target.value;
    props.onSubmit(searchValue);
  }
  
  return (
    <header className="Header">
      <Link to={"/"}><h1>Lista de filmes</h1></Link>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Pesquise por filmes" onChange={handleInputChange}/>
      </form>
      
    </header>
  );
};

export default Header;