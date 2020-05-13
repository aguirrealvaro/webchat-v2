import authReducer from "./auth/reducer";
import chatReducer from "./chat/reducer";
import { combineReducers } from "redux";
import { AuthTypes } from "./auth/types";

const appReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AuthTypes.LOGOUT_USER) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
