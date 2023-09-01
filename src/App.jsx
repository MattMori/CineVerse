import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/Home/Home.jsx";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import './index.scss';
function App() {
  const [searchValue, setSearchValue] = useState("");

  
  return (
    <div className="App">
      <Header onSubmit={(inputValue) => setSearchValue(inputValue)} />
      <Routes>
        <Route path="/" element={<Home searchValueProp={searchValue} />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;