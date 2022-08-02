import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGame } from "../../actions/index.js";
import stl from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      alert("Ingrese el nombre de un Juego");
    }
    dispatch(getNameGame(name));
    setName("");
  }

  return (
    <div className={stl.sbcontainer}>
      <input
        className={stl.sbinput}
        type="text"
        placeholder="Buscar Juego"
        value={name}
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className={stl.sbbot}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  );
}
