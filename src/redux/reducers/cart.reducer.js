import { CART_ACTION_TYPES } from "../actions/cart.actions";
import logger from "../../helpers/logger.helper";

const initialState = {
  items: [],
};

export const cart = (state = initialState, action) => {
  logger.info("Runing cart reducer", state);

  switch (action.type) {
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
      // do something
      break;

    default:
      return state;
  }
};
