import React from "react";
import { Link } from "react-router-dom";
import stl from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={stl.container}>
      <div>
        <h1 className={stl.title}>Welcome</h1>
        <Link to="/home">
          <button className={stl.but}>Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
