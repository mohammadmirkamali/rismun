const intialState = { movies: [], errors: "" };

const moviesReducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      state = { ...state, movies: action.payload };
      break;
    case "DELETE_MOVIE":
      state = { ...state, errors: action.payload };
      break;
  }
  return state;
};

export default moviesReducer;
