import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

const loggerMiddleware = createLogger();

const configureStore = createStore(
  rootReducer,
  applyMiddleware(thunk, loggerMiddleware)
);

export default configureStore;
