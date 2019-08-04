import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import ListGroup from "./common/listGroup";
import Typography from "@material-ui/core/Typography";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class MovieForm extends Component {
  state = {
    data: { name: "", rate: "", img: "", actors: [] },
    errors: "",
    actors: [
      "Tom Hanks",
      "Will Smits",
      "Morgan Freeman",
      "Tom Cruise",
      "Brad Pitt",
      "Al Pacino"
    ],

    firstActors: [],
    test: ""
  };

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await axios.get(
        `http://localhost:3001/api/genres/${movieId}`
      );

      this.setState({
        data: this.mapToViewModel(movie),
        firstActors: movie.actors
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentWillMount() {
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      name: movie.name,
      rate: movie.rate,
      img: movie.img,
      actors: movie.actors
    };
  }

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

  callBack = names => {
    const data = { ...this.state.data };
    data.actors = names;
    this.setState({ data });
  };

  schema = {
    name: Joi.string()
      .required()
      .min(3)
      .label("Name"),
    rate: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Rate")
  };

  handleAddMovie = async () => {
    const { id } = this.props.match.params;
    const data = this.state.data;

    const obj = {
      name: data.name,
      rate: data.rate,
      img: data.img,
      actors: data.actors
    };

    try {
      if (id === "new") {
        await axios.post("http://localhost:3001/api/genres", obj);
      } else {
        await axios.put(`http://localhost:3001/api/genres/${id}`, obj);
      }

      window.location = "/movies";
    } catch (ex) {
      const errors = ex.response.data;
      toast.error(errors);
    }
  };

  handleImg = ev => {
    const img = ev.target.files[0];

    getBase64(img).then(res => {
      const newData = { ...this.state.data };
      newData.img = res;

      return this.setState({ data: newData });
    });
  };

  render() {
    const { data, errors, actors, firstActors } = this.state;
    // console.log(data);

    return (
      <React.Fragment>
        <div
          style={{
            marginLeft: "30%",
            textAlign: "center",
            width: "30%"
          }}
        >
          <Typography variant="h4" style={{ paddingBottom: 40 }}>
            Movie Form
          </Typography>
          <TextField
            style={{ paddingBottom: 30 }}
            id="standard-dense"
            value={data.name}
            onChange={this.handleChange("name")}
            label="Movie Name"
            margin="dense"
            fullWidth
            helperText={errors.name}
            error={errors.name ? true : false}
          />
          <TextField
            style={{ paddingBottom: 30 }}
            id="standard-dense"
            value={data.rate}
            onChange={this.handleChange("rate")}
            label="Movie Rate"
            margin="dense"
            fullWidth
            helperText={errors.rate}
            error={errors.rate ? true : false}
          />
          <ListGroup
            names={actors}
            parentCallBack={this.callBack}
            title="Actress"
            first={firstActors}
          />

          <input
            id="contained-button-file"
            style={{ display: "none" }}
            variant="contained"
            color="primary"
            type="file"
            onChange={this.handleImg}
          />
          <label htmlFor="contained-button-file" style={{ paddingTop: 30 }}>
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>

          <div style={{ paddingTop: 20 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleAddMovie()}
            >
              Add Movie
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieForm;
