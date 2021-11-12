import { React } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Beerlist from "./Pages/Beerlist";
import Home from "./Pages/Home";
// import ReactGA from "react-ga";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home} />
        <Route path="/beerlist" component={Beerlist} />
      </Switch>
    </Router>
  );
};

export default Routes;
