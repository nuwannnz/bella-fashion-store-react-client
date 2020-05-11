import { combineReducers } from "redux";
import { cart } from "./cart.reducer";
import { staffLogin } from "./admin-panel/login/staff.reducer";
import { notification } from "./admin-panel/notification.reducer";
import { product } from "./admin-panel/product.reducer";
import { ui } from "./ui.reducer";
import { brand } from "./admin-panel/brand.reducer";


export const customerReducer = combineReducers({
  product,
  cart,
  ui,
  brand
});

export const adminPanelReducer = combineReducers({
  staffLogin,
  notification,
  ui,
  product,
  brand
});
