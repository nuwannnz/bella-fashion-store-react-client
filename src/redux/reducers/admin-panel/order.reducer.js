import { ORDER_ACTION_TYPES } from "../../actions/admin-panel/order.actions";

const initialState = {
    items: []
}

export const order = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_ACTION_TYPES.LOAD_ORDERS_REQUEST:
            return {
                loading: true
            }

        case ORDER_ACTION_TYPES.LOAD_ORDERS_SUCCESS:
            return {
                items: action.payload
            }
        case ORDER_ACTION_TYPES.LOAD_ORDERS_FAILURE:
            return {
                loadingError: action.payload
            }

        default:
            return state
    }
}