import { combineReducers } from "redux";
import { cart } from "./customer/cart.reducer";
import { staffLogin } from "./admin-panel/login/staff.reducer";
import { notification } from "./admin-panel/notification.reducer";
import { userDashboard } from "./admin-panel/user-dashboard";
import { ui } from "./ui.reducer";
import { product } from "./admin-panel/product.reducer";
import { brand } from "./admin-panel/brand.reducer";
import { customer } from "./customer/customer.reducer";

export const customerReducer = combineReducers({
  customer,
  cart,
  ui,
  brand,
  product,
});

export const adminPanelReducer = combineReducers({
  staffLogin,
  notification,
  ui,
  userDashboard,
  product,
  brand,
});
