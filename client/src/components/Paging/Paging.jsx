/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import stl from "./Paging.module.css";

export default function Paging({ gamesPerPage, allGames, paging }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i + 1);
  }
  return (
    <nav>
      <ul className={stl.pagination}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className={stl.pagenr} key={number}>
              <a onClick={() => paging(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
