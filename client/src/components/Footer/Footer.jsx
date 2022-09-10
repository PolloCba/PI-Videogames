import React from "react";
import stl from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={stl.containerFooter}>
      <p className={stl.textFooter}>© Desarrollado por Claudio Amaya - 2022</p>
      <ul>
        <li>
          <img src="../../../assets/linkedin.png" alt="Not found" />
          <a href="https://www.linkedin.com/in/claudio-amaya-fullstack/">
            LinkedIn
          </a>
        </li>
        <li>
          <img src="../../../assets/github.png" alt="Not found" />
          <a href="https://github.com/PolloCba">GitHub</a>
        </li>
      </ul>
    </div>
  );
}
