import { PRODUCT_ACTION_TYPES } from "../../actions/admin-panel/product.actions";

const initialState = {
    products: [],
    successMsg:'',
    errorMsg:''
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
                case PRODUCT_ACTION_TYPES.PRODUCT_ADDED_SUCCESS_MSG:
                    return{
                        ...state,
                        successMsg: action.payload
                    }
                case PRODUCT_ACTION_TYPES.PRODUCT_ADDED_FAILURE_MSG:
                    return{
                        ...state,
                        errorMsg: action.payload
                    }
                case PRODUCT_ACTION_TYPES.CLEAR_PRODUCT_ADDED_SUCCESS_MSG:
                    return{
                        ...state,
                        successMsg: ''
                    }
                case PRODUCT_ACTION_TYPES.PRODUCT_DELETED:
                    return{
                        ...state,
                        products:[...state.products.filter(p => p._id  !== action.payload)]
                    }
                case PRODUCT_ACTION_TYPES.PRODUCT_UPDATED:
                    return {
                        products: state.products.map((product) =>
                        product._id === action.payload.product._id ? action.payload : product
                      ),
                    
                    }
                case PRODUCT_ACTION_TYPES.PRODUCT_UPDATED_SUCCESS_MSG:
                    return {
                        ...state,
                        successMsg: action.payload
                      
                    
                    }
                case PRODUCT_ACTION_TYPES.PRODUCT_UPDATED_FAILURE_MSG:
                return {
                    ...state,
                    errorMsg: action.payload
                  
                
                }
                case PRODUCT_ACTION_TYPES.CLEAR_PRODUCT_UPDATED_SUCCESS_MSG:
                return {
                    ...state,
                    successMsg: ''
                    
                }
        default:
            return state;
    }
}