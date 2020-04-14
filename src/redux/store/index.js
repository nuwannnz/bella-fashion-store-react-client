import { createStore } from "redux";
import { customerReducer, adminPanelReducer } from "../reducers";

export const customerStore = createStore(customerReducer);

export const adminPanelStore = createStore(adminPanelReducer);
