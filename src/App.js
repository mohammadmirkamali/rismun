import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "../src/components/nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./components/loginPage";
import jwtDecode from "jwt-decode";

import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Home from "./components/home";
// import Map1 from "./components/map";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);

      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Route path="/" render={props => <Nav {...props} user={user} />} />
        <Switch>
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/map" component={Map1} /> */}
          <Route path="/movies/:id" component={MovieForm} />
          <Route
            path="/movies"
            render={props => <Movies {...props} user={user} />}
          />
          <Route path="/" component={Home} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
