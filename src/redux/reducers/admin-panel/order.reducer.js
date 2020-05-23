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

        case ORDER_ACTION_TYPES.UPDATE_ORDER_REQUEST:
            return {
                ...state,
                updatingStatus: true
            }

        case ORDER_ACTION_TYPES.UPDATE_ORDER_SUCCESS:
            return {
                items: [...state.items.map(item => item._id === action.payload._id ? action.payload : item)]
            }
        case ORDER_ACTION_TYPES.UPDATE_ORDER_FAILURE:
            return {
                ...state,
                updateError: action.payload
            }

        case ORDER_ACTION_TYPES.DELETE_ORDER_REQUEST:
            return {
                ...state,
                deleting: true
            }

        case ORDER_ACTION_TYPES.DELETE_ORDER_SUCCESS:
            return {
                items: [...state.items.filter(item => item._id !== action.payload)]
            }
        case ORDER_ACTION_TYPES.DELETE_ORDER_FAILURE:
            return {
                ...state,
                deleteError: action.payload
            }

        default:
            return state
    }
}