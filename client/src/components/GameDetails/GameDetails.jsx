/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import stl from "./GameDetails.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  var myGame = useSelector((state) => state.detail);

  return (
    <div className={stl.wrapper}>
      {myGame.length > 0 ? (
        <div className={stl.contarea}>
          <h1>{myGame.name}</h1>
          <img
            className={stl.detimg}
            src={myGame.image}
            alt="Not found"
            width="250px"
            heigth="300px"
          ></img>
          <h3>Descripcion</h3>
          <p>{myGame.description}</p>
          <h4>{`Fecha Lanzamiento ${myGame.releaseDate}`}</h4>
          <h4>{`Rating: ${myGame.rating}`}</h4>
          <h4>{`Generos: ${myGame.genres}`}</h4>
          <h4>{`Plataformas: ${myGame.platforms}`}</h4>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/videogames">
        <button className={stl.botback}>Volver</button>
      </Link>
    </div>
  );
}
//   return (
//     <div>
//       <div>
//         <div>
//           <h2>{detail.name} details</h2>
//           <Link to="/videogames">
//             <button>Home</button>
//           </Link>
//         </div>
//         <img
//           src={detail.image}
//           alt="Not found"
//           width="250px"
//           heigth="300px"
//         ></img>
//         <h3>Description</h3>
//         <h5>{detail.description}</h5>
//         <div>
//           <h4>{`Rating:   ${detail.rating}`} </h4>
//         </div>
//         <div>
//           <h4>{`Released date:  ${detail.released}`} </h4>
//         </div>
//         <h4>{`Platforms:  ${detail.platforms}`}</h4>
//         <h4>{`Genres: ${detail.genres}`}</h4>
//       </div>
//     </div>
//   );
// }
