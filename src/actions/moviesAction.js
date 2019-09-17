import axios from "axios";
import { toast } from "react-toastify";

export function getMovies() {
  return async dispatch => {
    const { data: movies } = await axios.get(
      "http://localhost:8000/api/genres"
    );

    dispatch({ type: "GET_MOVIES", payload: movies });
  };
}

export function deleteMovie(movie) {
  return async dispatch => {
    for (let key of movie.data) {
      try {
        await axios.delete(
          `http://localhost:8000/api/genres/${movie[key.index]._id}`
        );
      } catch (ex) {
        const errors = ex.response.data;
        toast.error(errors);
        dispatch({ type: "DELETE_MOVIE", payload: errors });
      }
    }
  };
}
