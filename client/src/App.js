import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Destination_Form from "./pages/Destination_Form/Destination_Form";
import Options from "./pages/Options.js"
// import "./components/style.css";

function App() {
  return (
    <Router>
      <div className="wrapping">
        <Switch>
        <Route exact path="/" component={Destination_Form} />
        <Route exact path="/Options" component={Options} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
