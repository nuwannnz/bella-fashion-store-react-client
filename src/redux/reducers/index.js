import { combineReducers } from "redux";
import { cart } from "./cart.reducer";
import { staffLogin } from "./admin-panel/login/staff.reducer";
import { notification } from "./admin-panel/notification.reducer";
import { ui } from "./ui.reducer";
<<<<<<< HEAD
import {category} from "./admin-panel/category.reducer"


export const customerReducer = combineReducers({
=======
import { customer } from "./customer/customer.reducer";


export const customerReducer = combineReducers({
  customer,
>>>>>>> 0a32cacffb0bf362a5238e5eb7efdb21bea55a6e
  cart,
  ui
});

export const adminPanelReducer = combineReducers({
  staffLogin,
  notification,
  category,
  ui
});

