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
      <div className={stl.titulo}>
        <h1>Videogame App</h1>
        <SearchBar />
      </div>
      <div className={stl.camposFilter}>
        <select className={stl.hpfilter} onChange={(e) => handleSortGames(e)}>
          <option key="orden" value="asc">
            Sort...
          </option>
          <option key="asc" value="asc">
            Upward A-Z
          </option>
          <option key="desc" value="desc">
            Falling Z-A
          </option>
          <option key="ratingMayor" value="ratingMayor">
            Best Rating
          </option>
          <option key="ratingMenor" value="ratingMenor">
            Worse Rating
          </option>
        </select>
        <select
          className={stl.hpfilter}
          onChange={(e) => handleFilterCreated(e)}
        >
          <option key="Api+Db" value="all">
            Search By...
          </option>
          <option key="all" value="all">
            All Games
          </option>
          <option key="created" value="created">
            Created
          </option>
          <option key="api" value="api">
            Api Games
          </option>
        </select>
        <select className={stl.hpfilter} onChange={(e) => handleGenreFilter(e)}>
          <option key="genres">Genres...</option>
          {genres.map((g) => (
            <option key={g.name} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>
        <ul className="ul">
          <li key="genresLi">{input.genres.map((g) => g)}</li>
        </ul>
        <button
          className={stl.hpfilter}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh All Filters
        </button>
        <Link className={stl.hpbot1} to="/videogame">
          Create Game
        </Link>
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
                  genres={"Genres - " + e.genres}
                  rating={"Rating - " + e.rating}
                />
              </Link>
            );
          })}
        </div>
        <Paging
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          paging={paging}
        />
      </div>
      <Link to="/">
        <button className={stl.bot2}>Back</button>
      </Link>
    </div>
  );
}
