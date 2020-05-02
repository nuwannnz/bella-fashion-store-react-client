import { combineReducers } from "redux";
import { cart } from "./cart.reducer";
import { staff } from "./admin-panel/staff.reducer";
import { notification } from "./admin-panel/notification.reducer";
import { ui } from "./ui.reducer";
import { customer } from "./customer/customer.reducer";

export const customerReducer = combineReducers({
  customer,
  cart,
  ui
});

export const adminPanelReducer = combineReducers({
  staff,
  notification,
  ui
});
