import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postGame, getGenres, getPlatforms } from "../../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import stl from "./CreateGame.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Nombre del juego requerido";
  } else if (input.name.length < 4) {
    errors.name = "El juego debe tener al menos 4 letras";
  }
  if (!input.description) {
    errors.description = "Descripcion del juego requerida";
  } else if (input.description.length < 8) {
    errors.description = "La descripcion debe tener al menos 8 letras";
  }
  if (!input.image) {
    errors.image = "Ingrese una imagen en formato URL";
  }
  if (!input.releaseDate) {
    errors.releaseDate = "Ingrese una fecha de lanzamiento";
  } else if (
    !/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/.test(
      input.releaseDate
    )
  ) {
    errors.releaseDate = "Ingrese un formato y fecha valida";
  }
  if (!input.rating) {
    errors.rating = "El rating es requerido";
  } else if (!/^[0-5]+([.][0-9]+)?$/.test(input.rating)) {
    errors.rating = "El rating debe ser entre 0 - 5";
  }
  return errors;
}

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
    image: "",
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
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: input.genres,
      });
    } else {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  }

  function handlePlatforms(e) {
    if (input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: input.platforms,
      });
    } else {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.name) {
      return alert("Ingrese un nombre");
    }
    if (!input.description) {
      return alert("Ingrese una descripción");
    }
    if (!input.image) {
      return alert("Ingrese alguna imagen para el juego");
    }
    if (!input.releaseDate) {
      return alert("Ingrese una fecha de lanzamiento");
    }
    if (!input.rating) {
      return alert("Ingrese el rating");
    }
    if (input.rating < 0 || input.rating > 5) {
      return alert("Ingrese un rating valido");
    }
    if (input.genres.length === 0) {
      return alert("Ingrese algun genero");
    }
    if (input.platforms.length === 0) {
      return alert("Ingrese alguna plataforma");
    }
    dispatch(postGame(input));
    alert("Juego Creado!!!");
    setInput({
      name: "",
      description: "",
      releaseDate: "",
      rating: "",
      image: "",
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

  return (
    <div className={stl.container}>
      <div className={stl.avgwrapper}>
        <h1 className={stl.h1}>Crea tu Juego</h1>
        <form className={stl.formarea} onSubmit={handleSubmit}>
          <div className={stl.detailsarea}>
            <label>Nombre </label>
            <input
              key="name"
              type="text"
              value={input.name}
              name="name"
              placeholder="Ingrese nombre del juego"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className={stl.error}> {errors.name} </p>}
          </div>
          <div>
            <label>Descripción </label>
            <textarea
              key="description"
              className={stl.description}
              type="text"
              name="description"
              placeholder="Ingrese descripcion del juego"
              value={input.description}
              onChange={(e) => handleChange(e)}
            />
            {errors.description && (
              <p className={stl.error}> {errors.description} </p>
            )}
          </div>
          <div className={stl.campos}>
            <label>Imagen </label>
            <input
              key="image"
              type="text"
              value={input.image}
              name="image"
              placeholder="Ingrese la URL de la imagen"
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p className={stl.error}> {errors.image} </p>}
          </div>
          <div className={stl.campos}>
            <label>Fecha de Lanzamiento </label>
            <input
              key="releaseDate"
              type="text"
              name="releaseDate"
              placeholder="DD/MM/YYYY"
              value={input.releaseDate}
              onChange={(e) => handleChange(e)}
            />
            {errors.releaseDate && (
              <p className={stl.error}> {errors.releaseDate} </p>
            )}
          </div>
          <div className={stl.campos}>
            <label>Rating </label>
            <input
              key="rating"
              type="text"
              name="rating"
              className={stl.rating}
              value={input.rating}
              onChange={(e) => handleChange(e)}
            />
            {errors.rating && <p className={stl.error}> {errors.rating} </p>}
          </div>
          <div className={stl.camposSelect}>
            <div className={stl.campos}>
              <label>Generos </label>
              <select className={stl.select} onChange={(e) => handleSelect(e)}>
                <option key="genresEl">Elegir...</option>
                {genres.map((g) => (
                  <option key={g.name} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={stl.campos}>
              <label>Plataformas </label>
              <select onChange={handlePlatforms}>
                <option key="platfomsEl">Elegir...</option>
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {errors.platform && (
                <p className={stl.error}> {errors.platform} </p>
              )}
            </div>
          </div>
          <button className={stl.submit} type="submit">
            Crear Videojuego
          </button>
        </form>
        <div className={stl.botonesEliminar}>
          <div className={stl.botContenedor}>
            {input.genres.map((e) => (
              <div className={stl.botEliminar}>
                <p>{e}</p>
                <button className={stl.bot} onClick={() => handleDelete(e)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <div className={stl.botContenedor}>
            {input.platforms.map((e) => (
              <div className={stl.botEliminar}>
                <p>{e}</p>
                <button className={stl.bot} onClick={() => handleDelete(e)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
        <Link to="/home">
          <button className={stl.bot2}>Volver</button>
        </Link>
      </div>
    </div>
  );
}

// e.preventDefault();
//     console.log(input)
//     let arrWithoutRepeating= [...input.genre, e.target.value]
//     setInput((input) => ({
//       ...input,
//       genre: [ ...new Set(arrWithoutRepeating)],
//     })); // correcion generos repetidos
