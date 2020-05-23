import { CUSTOMER_CATEGORY_ACTION_TYPES } from "../../actions/customer/customer.category.actions";

const initialState = {
    categories: []
}

export const category = (state = initialState, action) => {
    switch (action.type) {

        case CUSTOMER_CATEGORY_ACTION_TYPES.CATEGORY_INFO_LOADED:
            return {
                ...state,
                categories: action.payload
            }

        default:
            return state;
    }
}