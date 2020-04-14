import { combineReducers } from "redux";
import { cart } from "./cart.reducer";
import { staff } from "./admin-panel/staff.reducer";
import { notification } from "./admin-panel/notification.reducer";

export const customerReducer = combineReducers({
  cart,
});

export const adminPanelReducer = combineReducers({
  staff,
  notification,
});
