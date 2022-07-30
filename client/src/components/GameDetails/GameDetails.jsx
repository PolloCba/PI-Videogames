/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/index.js";
import { useEffect } from "react";
import stl from "./GameDetails.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  var myGame = useSelector((state) => state.detail);

  console.log(myGame);

  //   return (
  //     <div className={stl.wrapper}>
  //       {myGame.length > 0 ? (
  //         <div className={stl.contarea}>
  //           <h1>{myGame.name}</h1>
  //           <img
  //             className={stl.detimg}
  //             src={myGame.image}
  //             alt="Not found"
  //             width="250px"
  //             heigth="300px"
  //           ></img>
  //           <h3>Descripcion</h3>
  //           <p>{myGame.description}</p>
  //           <h4>{`Fecha Lanzamiento ${myGame.releaseDate}`}</h4>
  //           <h4>{`Rating: ${myGame.rating}`}</h4>
  //           <h4>{`Generos: ${myGame.genres}`}</h4>
  //           <h4>{`Plataformas: ${myGame.platforms}`}</h4>
  //         </div>
  //       ) : (
  //         <p>Loading...</p>
  //       )}
  //       <Link to="/home">
  //         <button className={stl.botback}>Volver</button>
  //       </Link>
  //     </div>
  //   );
  // }
  return (
    <div className={stl.wrapper}>
      <div className={stl.contarea}>
        <div className={stl.lineflex}>
          <h2>{myGame.name}</h2>
        </div>
        <img
          className={stl.detimg}
          src={myGame.background_image}
          alt="Not found"
        ></img>
        <h3>Descripción</h3>
        <h5>{myGame.description}</h5>
        <div className={stl.lineflex}>
          <h4>{`Rating:   ${myGame.rating}`} </h4>
        </div>
        <div className={stl.lineflex}>
          <h4>{`Fecha de Lanzamiento:  ${myGame.releaseDate}`} </h4>
        </div>
        <h4>{`Plataformas:  ${myGame.platforms}`}</h4>
        <h4>{`Generos: ${myGame.genres}`}</h4>
        <Link to="/home">
          <button className={stl.botback}>Volver</button>
        </Link>
      </div>
    </div>
  );
}
