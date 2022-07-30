require("dotenv").config();
const { API_KEY } = process.env;
const { Router } = require("express");
const router = Router();
const axios = require("axios").default;
const { Videogame, Genre } = require("../db");

//TODO -----> GET a "/videogames" <--------

// router.get("/", async (req, res) => {
//   //busco en la DB si tengo juegos creados y me traigo todos
//   let videogamesDb = await Videogame.findAll({
//     include: Genre,
//   });
//   //Parseo el objeto
//   videogamesDb = JSON.stringify(videogamesDb);
//   videogamesDb = JSON.parse(videogamesDb);
//   //Aca dejo el arreglo de generos plano con solo los nombres de cada genero(llega array de objetos)
//   videogamesDb = videogamesDb.reduce(
//     (acc, el) =>
//       acc.concat({
//         ...el,
//         genres: el.genres.map((g) => g.name),
//       }),
//     []
//   );

//   //TODO QUERIES --------> GET /videogames?name="..." <-----------
//   // si llegan queries "name" lo agarro por aca
//   if (req.query.name) {
//     try {
//       //busco si existe el juego en la API
//       let response = await axios.get(
//         `https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}`
//       );
//       if (!response.data.count)
//         return res.status(204).json(`Juego no encontrado "${req.query.name}"`);
//       //filtro SOLO la data que necesito para enviarle al front
//       const gamesREADY = response.data.results.map((game) => {
//         return {
//           id: game.id,
//           name: game.name,
//           background_image: game.background_image,
//           rating: game.rating,
//           genres: game.genres.map((g) => g.name),
//         };
//       });

//       //como antes me traje TODOS de la base de datos, si entro por queries, solo filtro los que coincidan con la busqueda
//       const filteredGamesDb = videogamesDb.filter((g) =>
//         g.name.toLowerCase().includes(req.query.name.toLowerCase())
//       );
//       //doy prioridad a la DB, y sumo todos, y corto el array en 15
//       const results = [...filteredGamesDb, ...gamesREADY.splice(0, 15)];
//       return res.json(results);
//     } catch (err) {
//       return console.log(err);
//     }
//   } else {
//     // SI NO ENTRO POT QUERIES --> voy a buscar todos los juegos a la API
//     try {
//       let pages = 0;
//       let results = [...videogamesDb]; //sumo lo que tengo en la DB
//       let response = await axios.get(
//         `https://api.rawg.io/api/games?key=${API_KEY}`
//       );
//       while (pages < 6) {
//         pages++;
//         //filtro solo la DATA que necesito enviar al FRONT
//         const gammesREADY = response.data.results.map((game) => {
//           return {
//             id: game.id,
//             name: game.name,
//             background_image: game.background_image,
//             rating: game.rating,
//             genres: game.genres.map((g) => g.name),
//           };
//         });
//         results = [...results, ...gammesREADY];
//         response = await axios.get(response.data.next); //vuelvo a llamar a la API con next
//       }
//       return res.json(results);
//     } catch (err) {
//       console.log(err);
//       return res.sendStatus(500);
//     }
//   }
// });

//Search all videogames or find by query name
router.get("/", async (req, res) => {
  const { name } = req.query;
  //Search Videogames from the Api
  try {
    if (name) {
      let sname = name.split(" ").join("-").toLowerCase();
      var apiresult = await axios.get(
        `https://api.rawg.io/api/games?search=${sname}&key=${API_KEY}&page_size=100`
      );
      apiresult = apiresult.data.results;
    } else {
      async function SearchApi() {
        try {
          const promise1 = axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=50`
          );
          const promise2 = axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=50`
          );
          const promise3 = axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=50`
          );

          await Promise.all([promise1, promise2, promise3]).then(function (
            values
          ) {
            apiresult = values[0].data.results
              .concat(values[1].data.results)
              .concat(values[2].data.results);
          });
        } catch (err) {
          console.log("Error searchin the API: ", err);
        }
      }
      await SearchApi();
    }
    if (apiresult.length > 0) {
      var apivgames = apiresult.map((p) => {
        let b = [];
        for (i = 0; i < p.genres.length; i++) {
          b.push(p.genres[i].name);
        }
        return {
          id: p.id,
          name: p.name,
          image: p.background_image,
          genres: b.toString(),
          rating: p.rating,
          platform: p.platforms.map((p) => p.platform.name),
          origin: "API",
        };
      });
      if (name) {
        apivgames = apivgames.filter((p) =>
          p.name.toLowerCase().includes(name.toLowerCase())
        );
      }
    } else var apivgames = [];

    //Search Videogames from local Database
    var dbvgames = [];
    dbvgames = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    if (name) {
      dbvgames = dbvgames.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    var dbvgames = dbvgames.map((p) => {
      let b = [];
      for (i = 0; i < p.genres.length; i++) {
        b.push(p.genres[i].name);
      }
      return {
        id: p.id,
        name: p.name,
        image:
          "https://media.rawg.io/media/games/2d5/2d57e7ffa1e3af2fa34229bd1041461d.jpg",
        genres: b.toString(),
        createdInDb: true,
        rating: p.rating,
        platform: p.platforms,
        origin: "DB",
      };
    });
    //Join and return resultss
    const allvgames = dbvgames.concat(apivgames);
    res.json(allvgames.length ? allvgames : "No videogames found");
  } catch (error) {
    res.send(`Error in route /videogames ${error}`);
  }
});

//TODO  ------> POST /videogame <-------

router.post("/", async (req, res) => {
  let {
    name,
    description,
    releaseDate,
    rating,
    createdInDb,
    genres,
    platforms,
  } = req.body;
  platforms = platforms.toString();
  let gameCreated = await Videogame.create({
    name,
    description,
    releaseDate,
    rating,
    createdInDb,
    platforms,
  });
  //await gameCreated[0].setGenres(genres); // relaciono ID genres al juego creado
  let genreDb = await Genre.findAll({
    where: { name: genres },
  });
  gameCreated.addGenre(genreDb);

  res.send("Juego creado con exito");
});

module.exports = router;
