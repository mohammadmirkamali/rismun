import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";
import { toast } from "react-toastify";

class Actors extends Component {
  state = { name: "", actors: [] };

  async componentDidMount() {
    const { data: actors } = await axios.get(
      "http://localhost:3001/api/actors"
    );
    this.setState({ actors });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleActors = async () => {
    const obj = { name: this.state.name };

    try {
      await axios.post("http://localhost:3001/api/actors", obj);
      console.log(obj);

      window.location = "/actors";
    } catch (ex) {
      const errors = ex.response.data;
      toast.error(errors);
    }
  };
  render() {
    const { name, actors } = this.state;

    return (
      <React.Fragment>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "2rem",
            textAlign: "center",
            width: "25rem",
            height: "auto",
            borderRadius: "10%",
            borderStyle: "groove",
            padding: "2rem"
          }}
        >
          <TextField
            label="Actor name"
            variant="outlined"
            value={name}
            onChange={this.handleChange("name")}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 20 }}
              onClick={this.handleActors}
            >
              Add Actor
            </Button>
          </div>

          {actors.map(ac => (
            <ListItem button key={ac._id} divider>
              <ListItemText primary={ac.name} />
            </ListItem>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Actors;
