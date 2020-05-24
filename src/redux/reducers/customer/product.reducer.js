import { PRODUCT_ACTION_TYPES } from "../../actions/customer/product.actions";

const initialState = {

    products: []

}

export const product = (state = initialState, action) => {
    switch(action.type) {
        case PRODUCT_ACTION_TYPES.PRODUCT_INFO_LOADED:
            return {
                ...state,
                products: action.payload
            }

        default:
            return state;
    }
}