import { combineReducers } from "redux";
import userReducer from "./userReducer";
import themeReducer from "./themeReducer";

let reducers = combineReducers({
  userReducer,
  themeReducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
