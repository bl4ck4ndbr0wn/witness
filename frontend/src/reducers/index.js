import { combineReducers } from "redux";

import profileReducer from "./profileReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  profile: profileReducer,
  errors: errorReducer,
  auth: authReducer
});
