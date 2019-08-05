import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Nav from "../src/components/nav";
import jwtDecode from "jwt-decode";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import Map1 from "./components/map";
import Actors from "./components/actors";
// import axios from "axios";

class App extends Component {
  state = {};

  componentDidMount() {
    // const actors = [
    //   "Tom Hanks",
    //   "Will Smits",
    //   "Morgan Freeman",
    //   "Tom Cruise",
    //   "Brad Pitt",
    //   "Al Pacino"
    // ];

    // for (let key in obj) {
    //   await axios.post("http://localhost:3001/api/actors", obj[key]);
    // }
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
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/actors" component={Actors} />
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
