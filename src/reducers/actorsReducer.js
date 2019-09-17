const initialState = { actors: [], name: "" };

const actorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ACTORS":
      state = { ...state, actors: action.payload };
      break;
    case "SET_NAME":
      state = { ...state, name: action.payload };
      break;
  }
  return state;
};

export default actorsReducer;
