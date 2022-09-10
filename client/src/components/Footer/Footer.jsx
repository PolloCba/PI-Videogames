import React from "react";
import stl from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={stl.containerFooter}>
      <p className={stl.textFooter}>© Developed by Claudio Amaya - 2022</p>
      <ul className={stl.footerList}>
        <li className={stl.footerList__item}>
          <a
            href="https://www.linkedin.com/in/claudio-amaya-fullstack/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={stl.footerImg}
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="Not found"
            />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/PolloCba"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={stl.footerImg}
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="Not found"
            />
          </a>
        </li>
      </ul>
    </div>
  );
}
