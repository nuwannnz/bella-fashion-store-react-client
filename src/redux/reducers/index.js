import { combineReducers } from "redux";
import { cart } from "./cart.reducer";

export const customerReducer = combineReducers({
  cart,
});

export const adminPanelReducer = combineReducers({});
