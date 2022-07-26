import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import CreateGame from "./components/CreateGame/CreateGame.jsx";
import GameDetails from "./components/GameDetails/GameDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/videogame" component={CreateGame} />
          <Route path="/videogames/:id" component={GameDetails} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
