import { combineReducers } from "redux";

import { alert } from "./AlertReducers";
import { authentication } from "./AuthReducers";
import { items } from "./ItemsReducer";
import { registration } from "./RegistrationReducer";
import { users } from "./UsersReducer";

const rootReducer = combineReducers({
  alert,
  authentication,
  items,
  registration,
  users
});

export default rootReducer;
