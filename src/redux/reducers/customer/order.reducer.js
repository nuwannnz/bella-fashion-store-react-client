import { ORDER_ACTION_TYPES } from "../../actions/customer/order.actions";

const initialState = {
    items: [],
};

export const order = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_ACTION_TYPES.ORDER_ADDED:
            return {

                items: [...state.items, action.payload]
            };

        case ORDER_ACTION_TYPES.ORDERS_LOADED:
            return {
                items: action.payload
            }

        default:
            return state;
    }
};
