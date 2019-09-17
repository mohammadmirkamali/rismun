// import { logger } from "redux-logger";
import { combineReducers, applyMiddleware, createStore } from "redux";
import movies from "./reducers/moviesReducer";
import actors from "./reducers/actorsReducer";
import thunck from "redux-thunk";

export default createStore(
  combineReducers({ movies, actors }),
  {},
  applyMiddleware(thunck)
);
