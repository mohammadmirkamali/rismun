import axios from "axios";

export function getActors() {
  return async dispatch => {
    const { data: actors } = await axios.get(
      "http://localhost:8000/api/actors"
    );

    dispatch({ type: "GET_ACTORS", payload: actors });
  };
}

export function setName(name) {
  return { type: "SET_NAME", payload: name };
}
