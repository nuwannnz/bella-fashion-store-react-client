import { CART_ACTION_TYPES } from "../actions/cart.actions";

const initialState = {
    items: []
}

export const cart = (state = initialState, action) => {
    switch (action.type) {
        case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
            // do something
            break;

        default:
            return state;

    }
}