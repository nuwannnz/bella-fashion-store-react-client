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

                case PRODUCT_ACTION_TYPES.PRODUCT_ADDED:
                    return{
                        ...state,
                        products:[ action.payload, ...state.products]
                    }
                case PRODUCT_ACTION_TYPES.PRODUCT_DELETED:
                    return{
                        ...state,
                        products:state.products.filter(p => p._id  !== action.payload)
                    }
        default:
            return state;
    }
}