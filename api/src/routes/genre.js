require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const router = Router();
const axios = require("axios").default;
const { Genre } = require("../db");

//TODO -----> GET a "/genres" <--------

router.get("/", async (req, res) => {
  try {
    // si ya los tengo cargados en la DB los consumo desde alli.
    const dbGenres = await Genre.findAll();
    if (dbGenres.length) return res.json(dbGenres);

    //else --> los voy a buscar a la API
    const apiGenres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = apiGenres.data.results; // recibo un array de objetos, con los juego filtrados por GENERO
    //los guardo en la DB filtrando solo el nombre
    genres.forEach((e) => {
      Genre.findOrCreate({
        where: {
          name: e.name,
        },
      });
    });
    //(OPTIMIZADO) --> SOLO ENVIO AL FRONT LA INFO NECESARIA (nombre de los generos)
    const genresFront = genres.map((e) => {
      return {
        id: e.id,
        name: e.name,
      };
    });
    res.json(genresFront);
  } catch (err) {
    return console.log(err);
  }
});

module.exports = router;
