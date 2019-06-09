import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
// import "./components/style.css";

function App() {
  return (
    <Router>
      <div className="wrapping">
        <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
