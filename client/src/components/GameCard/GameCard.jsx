import React from "react";
import stl from "./GameCard.module.css";

export default function gameCard({ name, image, genres, rating }) {
  var genre = genres.split(" ,");
  if (genre.length > 2) {
    genre = genre.slice(0, 2);
  }
  if (genre.length === 1) {
    genre = genre.toString();
  } else {
    genre = genre.toString() + " (...)";
  }

  return (
    <div className={stl.container}>
      <div className={stl.card}>
        <h3>{name}</h3>
        <img className={stl.imag} src={image} alt="Not Found" />
        <p>{genres}</p>
        <span>{rating}</span>
      </div>
    </div>
  );
}
