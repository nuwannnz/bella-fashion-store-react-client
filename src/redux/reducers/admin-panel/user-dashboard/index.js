import { combineReducers } from "redux";
import { users } from "./user.reducer";
import { roles } from "./role.reducer";

export const userDashboard = combineReducers({
  users,
  roles,
});
