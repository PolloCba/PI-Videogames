import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postGame, getGenres, getPlatforms } from "../../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import stl from "./CreateGame.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (input.name.length < 4) {
    errors.name = "Name must have at least 4 characters";
  }
  if (!input.description) {
    errors.description = "Description required";
  } else if (input.description.length < 8) {
    errors.description = "Description must have at least 8 characters";
  }
  if (!input.image) {
    errors.image = "Image required. URL format.";
  }
  if (!input.releaseDate) {
    errors.releaseDate = "Release Date required";
  } else if (
    !/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/.test(
      input.releaseDate
    )
  ) {
    errors.releaseDate = "Enter a format and valid date";
  }
  if (!input.rating) {
    errors.rating = "Rating is required";
  } else if (!/^[0-5]+([.][0-9]+)?$/.test(input.rating)) {
    errors.rating = "Rating must be between 0 - 5";
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
      return alert("Enter a Name for the game");
    }
    if (!input.description) {
      return alert("Enter a Description for the game");
    }
    if (!input.image) {
      return alert("Enter a Image for the game");
    }
    if (!input.releaseDate) {
      return alert("Enter a Release Date for the game");
    }
    if (!input.rating) {
      return alert("Enter Rating of the game");
    }
    if (input.rating < 0 || input.rating > 5) {
      return alert("Enter a valid Rating");
    }
    if (input.genres.length === 0) {
      return alert("Enter Genres of the game");
    }
    if (input.platforms.length === 0) {
      return alert("Enter Platforms of the game");
    }
    dispatch(postGame(input));
    alert("Game Created successfully!!!");
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
        <h1 className={stl.h1}>Create Your Game</h1>
        <form className={stl.formarea} onSubmit={handleSubmit}>
          <div className={stl.detailsarea}>
            <label>Name </label>
            <input
              key="name"
              type="text"
              value={input.name}
              name="name"
              placeholder="Enter the game Name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className={stl.error}> {errors.name} </p>}
          </div>
          <div>
            <label>Description </label>
            <textarea
              key="description"
              className={stl.description}
              type="text"
              name="description"
              placeholder="Enter the game Description"
              value={input.description}
              onChange={(e) => handleChange(e)}
            />
            {errors.description && (
              <p className={stl.error}> {errors.description} </p>
            )}
          </div>
          <div className={stl.campos}>
            <label>Image </label>
            <input
              key="image"
              type="text"
              value={input.image}
              name="image"
              placeholder="Enter the URL Image"
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p className={stl.error}> {errors.image} </p>}
          </div>
          <div className={stl.campos}>
            <label>Release Date </label>
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
              <label>Genres </label>
              <select className={stl.select} onChange={(e) => handleSelect(e)}>
                <option key="genresEl">Chose...</option>
                {genres.map((g) => (
                  <option key={g.name} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={stl.campos}>
              <label>Platforms </label>
              <select onChange={handlePlatforms}>
                <option key="platfomsEl">Chose...</option>
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
          <div className={stl.botonesEliminar}>
            <div className={stl.botContenedor}>
              {input.genres.map((e) => (
                <div className={stl.botEliminar}>
                  <p>{e}</p>
                  <button className={stl.bot} onClick={() => handleDelete(e)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className={stl.botContenedor}>
              {input.platforms.map((e) => (
                <div className={stl.botEliminar}>
                  <p>{e}</p>
                  <button className={stl.bot} onClick={() => handleDelete(e)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button className={stl.submit} type="submit">
            Create Game
          </button>
        </form>
        <Link to="/home">
          <button className={stl.bot2}>Back</button>
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
