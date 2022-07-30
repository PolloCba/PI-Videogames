import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postGame, getGenres, getPlatforms } from "../../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import stl from "./CreateGame.module.css";

export default function GameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handlePlatforms(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postGame(input));
    alert("Juego Creado!!!");
    setInput({
      name: "",
      description: "",
      releaseDate: "",
      rating: "",
      genres: [],
      platforms: [],
    });
    history.push("/home");
  }

  function handleDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e),
      platforms: input.platforms.filter((p) => p !== e),
    });
  }

  console.log(platforms);
  console.log(genres);

  return (
    <div className={stl.avgwrapper}>
      <h1 className={stl.h1}>Crea tu Juego</h1>
      <form className={stl.formarea} onSubmit={handleSubmit}>
        <div className={stl.detailsarea}>
          <label>Nombre </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Descripcion </label>
          <textarea
            className={stl.description}
            type="text"
            name="description"
            value={input.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Fecha de Lanzamiento </label>
          <input
            type="date"
            name="releaseDate"
            value={input.releaseDate}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Rating </label>
          <input
            type="text"
            name="rating"
            value={input.rating}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Generos</label>
          <select onChange={(e) => handleSelect(e)}>
            <option>Elegir...</option>
            {genres.map((g) => (
              <option value={g.name}>{g.name}</option>
            ))}
          </select>
          <ul className="ul">
            <li>{input.genres.map((g) => g + " , ")}</li>
          </ul>
        </div>
        <div>
          <label>Plataformas </label>
          <select onChange={handlePlatforms}>
            <option>Elegir...</option>
            {platforms.map((p) => (
              <option value={p}>{p}</option>
            ))}
          </select>
          <ul className="ul">
            <li>{input.platforms.map((p) => p + " , ")}</li>
          </ul>
        </div>
        <button className={stl.submit} type="submit">
          Crear Videojuego
        </button>
      </form>
      {input.genres.map((e) => (
        <div>
          <p>{e}</p>
          <button className={stl.bot} onClick={() => handleDelete(e)}>
            x
          </button>
        </div>
      ))}
      {input.platforms.map((e) => (
        <div>
          <p>{e}</p>
          <button className={stl.bot} onClick={() => handleDelete(e)}>
            x
          </button>
        </div>
      ))}
      <Link to="/home">
        <button className={stl.bot2}>Volver</button>
      </Link>
    </div>
  );
}
