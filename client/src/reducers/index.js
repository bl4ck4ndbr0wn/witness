import { combineReducers } from "redux";

import claimReducer from "./claimReducer";
import profileReducer from "./profileReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  claim: claimReducer,
  profile: profileReducer,
  errors: errorReducer,
  auth: authReducer
});
