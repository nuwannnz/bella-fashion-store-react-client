import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { customerReducer, adminPanelReducer } from "../reducers";

export const customerStore = createStore(
  customerReducer,
  applyMiddleware(thunk)
);

export const adminPanelStore = createStore(
  adminPanelReducer,
  applyMiddleware(thunk)
);
