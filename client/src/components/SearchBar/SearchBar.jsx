import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGame } from "../../actions";
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
    dispatch(getNameGame(name));
  }

  return (
    <div className={stl.sbcontainer}>
      <input
        className={stl.sbinput}
        type="text"
        placeholder="Buscar Juego"
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
