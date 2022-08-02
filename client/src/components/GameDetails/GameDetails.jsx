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

  return (
    <div className={stl.wrapper}>
      <div className={stl.contarea}>
        <div className={stl.lineflex}>
          <h2>{myGame.name}</h2>
        </div>
        <img
          className={stl.detimg}
          src={myGame.background_image ? myGame.background_image : myGame.image}
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
