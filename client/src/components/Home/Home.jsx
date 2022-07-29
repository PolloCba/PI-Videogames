import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterCreated,
  orderByName,
  genreFilter,
} from "../../actions/index.js";
import { Link } from "react-router-dom";
import GameCard from "../GameCard/GameCard.jsx";
import Paging from "../Paging/Paging.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import stl from "../Home/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage; // =15
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; // =0
  const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame);

  console.log(genres);

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleGenreFilter(e) {
    e.preventDefault();
    dispatch(genreFilter(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleSortGames(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/videogame">Crear Videojuego</Link>
      <h1>App de Videojuegos</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los Juegos
      </button>
      <div>
        <select className={stl.hpfilter} onChange={(e) => handleSortGames(e)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
          <option value="rating">Rating</option>
        </select>
        <select className={stl.hpfilter} onChange={(e) => handleGenreFilter(e)}>
          {genres.sort().map((e) => {
            return <option value={e}>{e}</option>;
          })}
        </select>
        <select
          className={stl.hpfilter}
          onChange={(e) => handleFilterCreated(e)}
        >
          <option value="all">Todos</option>
          <option value="created">Creados</option>
          <option value="api">Api</option>
        </select>
        <div className={stl.c4}>
          <Paging
            gamesPerPage={gamesPerPage}
            allGames={allGames.length}
            paging={paging}
          />
        </div>
        <SearchBar />
        {currentGames?.map((e) => {
          return (
            <div className={stl.c5}>
              <Link to={`/videogames/${e.id}`}>
                <GameCard
                  name={e.name}
                  image={e.image}
                  genres={e.genres}
                  rating={e.rating}
                />
                ;
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
