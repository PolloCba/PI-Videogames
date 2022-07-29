import React from "react";
import { Link } from "react-router-dom";
import stl from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={stl.lpcontainer}>
      <h1>Welcome</h1>
      <Link to="/videogames">
        <button className={stl.but}>Ingresar</button>
      </Link>
    </div>
  );
}
