import React from "react";
import { Link } from "react-router-dom";
import stl from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={stl.container}>
      <div>
        <Link to="/home">
          <button type="submit" className={stl.but}>
            WELCOME
          </button>
        </Link>
      </div>
    </div>
  );
}
