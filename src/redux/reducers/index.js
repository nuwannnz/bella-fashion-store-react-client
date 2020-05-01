import { combineReducers } from "redux";
import { cart } from "./cart.reducer";
import { staff } from "./admin-panel/staff.reducer";
import { notification } from "./admin-panel/notification.reducer";
import { ui } from "./ui.reducer";
import {category} from "./admin-panel/category.reducer"

export const customerReducer = combineReducers({
  cart,
  ui
});

export const adminPanelReducer = combineReducers({
  staff,
  notification,
  ui
});

export const categoryAdminReducer = combineReducers ({
    ui: ui,
    category: category
})
