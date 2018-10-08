import React, { Component } from "react";
import LandingPage from "./LandingPage";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Addimage from "../Components/Image/Addimage";
import Header from "../Components/Header/Header";

export default class MasterLayout extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/addimage" component={Addimage} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
