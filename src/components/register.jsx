import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { register } from "../sevices/register";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import GoogleLogin from "react-google-login";
import Typography from "@material-ui/core/Typography";

class Register extends Component {
  state = {
    isSignedIn: false,
    data: { name: "", password: "", email: "" },
    errors: ""
  };

  responseGoogle = response => {
    const data = { ...this.state.data };
    data.name = response.w3.ig;
    data.email = response.w3.U3;
    data.password = response.w3.Eea;
    this.setState({ data });
    this.doSubmit();
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = name => event => {
    let data = this.state.data;
    data[name] = event.target.value;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(name, data[name]);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    this.setState({ data, errors });
  };

  schema = {
    name: Joi.string()
      .required()
      .min(5)
      .label("Name"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    email: Joi.string()
      .required()
      .email()
      .label("Email")
  };

  doSubmit = async () => {
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    try {
      const response = await register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      const errors = ex.response.data;
      toast.error(errors);

      this.setState({ errors });
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2rem",
            textAlign: "center",
            width: "30rem",
            minHeight: "25rem",
            borderRadius: "10%",
            borderStyle: "groove",
            padding: "2rem"
          }}
        >
          <div>
            <Typography variant="h4">Register</Typography>
            <TextField
              value={data.name}
              onChange={this.handleChange("name")}
              label="Name"
              helperText={errors.name}
              margin="dense"
              error={errors.name ? true : false}
              fullWidth
            />
          </div>
          <div>
            <TextField
              label="Email"
              value={data.email}
              onChange={this.handleChange("email")}
              type="email"
              name="email"
              helperText={errors.email}
              autoComplete="email"
              margin="dense"
              fullWidth
              error={errors.email ? true : false}
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input1"
              value={data.password}
              onChange={this.handleChange("password")}
              label="Password"
              type="password"
              fullWidth
              autoComplete="current-password"
              helperText={errors.password}
              margin="dense"
              error={errors.password ? true : false}
            />
          </div>

          <div>
            <Button
              style={{ marginTop: 20 }}
              variant="contained"
              color="primary"
              onClick={() => this.doSubmit()}
            >
              Register
            </Button>
          </div>

          <div style={{ paddingTop: 20 }}>
            <GoogleLogin
              clientId="1039984301719-6aaiv6258glfiofndpec07dhr5afvei8.apps.googleusercontent.com"
              buttonText="Register with Gmail"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          {/* <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          /> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
