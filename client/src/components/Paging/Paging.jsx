/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import stl from "./Paging.module.css";

export default function Paging({ gamesPerPage, allGames, paging }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className={stl.navPagination}>
      <ul className={stl.pagination}>
        <p className={stl.pPagination}>Pages</p>
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
