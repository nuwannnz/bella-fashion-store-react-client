import { combineReducers } from "redux";
import { auth } from "./auth.reducer";
import { loginUi } from "./loign-ui.reducer";

export const staffLogin = combineReducers({
  auth,
  ui: loginUi
})