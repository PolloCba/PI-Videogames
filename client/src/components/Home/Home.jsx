/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterCreated,
  orderByName,
  genreFilter,
  getGenres,
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

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [input, setInput] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
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
    <div className={stl.container}>
      <h1>App de Videojuegos</h1>
      <div className={stl.nav}>
        <button
          className={stl.hpbot}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Recargar los Juegos de la App
        </button>
        <SearchBar />
        <Link className={stl.hpbot} to="/videogame">
          Crear Videojuego
        </Link>
      </div>
      <div>
        <select className={stl.hpfilter} onChange={(e) => handleSortGames(e)}>
          <option key="orden">Ordenar...</option>
          <option key="asc" value="asc">
            Ascendente A-Z
          </option>
          <option key="desc" value="desc">
            Descendente Z-A
          </option>
          <option key="ratingMayor" value="ratingMayor">
            Mayor Rating
          </option>
          <option key="ratingMenor" value="ratingMenor">
            Menor Rating
          </option>
        </select>
        <select
          className={stl.hpfilter}
          onChange={(e) => handleFilterCreated(e)}
        >
          <option key="Api+Db">Api + Db...</option>
          <option key="all" value="all">
            Todos
          </option>
          <option key="created" value="created">
            Creados
          </option>
          <option key="api" value="api">
            Api
          </option>
        </select>
        <select className={stl.hpfilter} onChange={(e) => handleGenreFilter(e)}>
          <option key="genres">Generos...</option>
          {genres.map((g) => (
            <option key={g.name} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>
        <ul className="ul">
          <li key="genresLi">{input.genres.map((g) => g)}</li>
        </ul>
      </div>
      <Paging
        gamesPerPage={gamesPerPage}
        allGames={allGames.length}
        paging={paging}
      />
      <div>
        <div className={stl.c5}>
          {currentGames?.map((e) => {
            return (
              <Link className={stl.card} to={`/videogames/${e.id}`}>
                <GameCard
                  name={e.name}
                  image={e.image}
                  genres={"Generos -- " + e.genres}
                  rating={"Rating -- " + e.rating}
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className={stl.c4}></div>
      <Link to="/">
        <button className={stl.bot2}>Página de Inicio</button>
      </Link>
    </div>
  );
}
