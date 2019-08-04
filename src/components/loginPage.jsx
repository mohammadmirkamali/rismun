import React, { Component } from "react";
import Login from "./login";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Register from "./register";

class LoginPage extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid
            item
            xs={6}
            style={{ borderRight: "inset", height: 600, marginTop: 20 }}
          >
            <Typography
              variant="h4"
              style={{ paddingTop: 50, paddingLeft: 60, paddingBottom: 40 }}
            >
              Register
            </Typography>

            <Register />
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              style={{ paddingTop: 50, paddingLeft: 60, paddingBottom: 40 }}
            >
              Login
            </Typography>
            <Login />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default LoginPage;
