import { combineReducers } from "redux";
import { cart } from "./customer/cart.reducer";
import { staffLogin } from "./admin-panel/login/staff.reducer";
import { notification } from "./admin-panel/notification.reducer";
import { ui } from "./ui.reducer";
import { customer } from "./customer/customer.reducer";

export const customerReducer = combineReducers({
  customer,
  cart,
  ui,
});

export const adminPanelReducer = combineReducers({
  staffLogin,
  notification,
  ui,
});
