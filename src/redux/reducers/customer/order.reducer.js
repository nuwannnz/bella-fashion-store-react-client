import { CART_ACTION_TYPES } from "../../actions/customer/cart.actions";

const initialState = {
    items: [],
};

export const order = (state = initialState, action) => {
    switch (action.type) {
        case CART_ACTION_TYPES.CART_ITEMS_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        default:
            return state;
    }
};
