import { combineReducers } from "redux";
import { cart } from "./cart.reducer";
import { staffLogin } from "./admin-panel/login/staff.reducer";
import { notification } from "./admin-panel/notification.reducer";
import { ui } from "./ui.reducer";
import {category} from "./admin-panel/category.reducer"


export const customerReducer = combineReducers({
  cart,
  ui
});

export const adminPanelReducer = combineReducers({
  staffLogin,
  notification,
  category,
  ui
});

