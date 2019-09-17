import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import { getActors, setName } from "./../actions/actorsAction";
import axios from "axios";
import { toast } from "react-toastify";

class Actors extends Component {
  async componentDidMount() {
    this.props.getActorsList();
  }

  addActor = async () => {
    const obj = { name: this.props.actors.name };
    try {
      await axios.post("http://localhost:8000/api/actors", obj);
      window.location = "/actors";
    } catch (ex) {
      toast.error(ex.response.data);
    }
  };
  render() {
    const { actors, name } = this.props.actors;

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
            onChange={e => this.props.newActor(e.target.value)}
          />
          <div>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 20 }}
              onClick={this.addActor}
            >
              Add Actor
            </Button>
          </div>

          {actors &&
            actors.map(ac => (
              <ListItem button key={ac._id} divider>
                <ListItemText primary={ac.name} />
              </ListItem>
            ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    actors: state.actors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getActorsList: () => {
      dispatch(getActors());
    },
    newActor: name => {
      dispatch(setName(name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Actors);
