import {
  GET_VIDEOGAMES,
  GENRES_FILTER,
  GET_GENRES,
  FILTER_CREATED,
  ORDER_BY_NAME,
  GET_NAME_GAME,
  GET_DETAILS,
  GET_PLATFORMS,
} from "../actions/index.js";

const initialState = {
  videogames: [],
  genres: [],
  vgfilter: [],
  detail: [],
  platforms: [],
  allGames: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allGames: action.payload,
        vgfilter: action.payload,
      };
    case GET_NAME_GAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };
    case GENRES_FILTER:
      const allVgames = state.vgfilter;
      const genrefilter =
        action.payload === "all"
          ? allVgames
          : allVgames.filter((p) => p.genres.includes(action.payload));
      if (genrefilter.length === 0) {
        alert(`No videogames found for ${action.payload} genre`);
        return state;
      } else {
        return {
          ...state,
          videogames: genrefilter,
        };
      }
    case FILTER_CREATED:
      const originVg = state.vgfilter;
      const createdFilter =
        action.payload === "created"
          ? originVg.filter((e) => e.createdInDb)
          : originVg.filter((e) => !e.createdInDb);
      return {
        ...state,
        videogames: action.payload === "all" ? state.vgfilter : createdFilter,
      };
    case ORDER_BY_NAME:
      if (action.payload === "ratingMayor") {
        let sortedArr = state.videogames.sort(function (a, b) {
          if (a.rating > b.rating) {
            return -1;
          }
          if (b.rating > a.rating) {
            return 1;
          }
          return 0;
        });
        return {
          ...state,
          videogames: sortedArr,
        };
      } else if (action.payload === "ratingMenor") {
        let sortedArr = state.videogames.sort(function (a, b) {
          if (a.rating > b.rating) {
            return 1;
          }
          if (b.rating > a.rating) {
            return -1;
          }
          return 0;
        });
        return {
          ...state,
          videogames: sortedArr,
        };
      } else {
        let sortedArr =
          action.payload === "asc"
            ? state.videogames.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (b.name > a.name) {
                  return -1;
                }
                return 0;
              })
            : state.videogames.sort(function (a, b) {
                if (a.name > b.name) {
                  return -1;
                }
                if (b.name > a.name) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          videogames: sortedArr,
        };
      }
    case "POST_GAME":
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
