import { combineReducers } from "redux";

import { alert } from "./AlertReducers";
import { authentication } from "./AuthReducers";
import { registration } from "./RegistrationReducer";
import { users } from "./UsersReducer";

const rootReducer = combineReducers({
  alert,
  authentication,
  registration,
  users
});

export default rootReducer;
