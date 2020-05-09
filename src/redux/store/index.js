import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { customerReducer, adminPanelReducer } from "../reducers";




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const customerStore = createStore(
  customerReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const adminPanelStore = createStore(
  adminPanelReducer,
  composeEnhancers(applyMiddleware(thunk))
);
