import { WISHLIST_ACTION_TYPES } from "../../actions/customer/wishlist.action";

const initialState = {
    items: [],
};

export const wishlist = (state = initialState, action) => {
    switch(action.type) {
        case WISHLIST_ACTION_TYPES.WISHLIST_ITEMS_LOAD_REQUEST:
            return {
                ...state,
                loading: true
            };

        case WISHLIST_ACTION_TYPES.WISHLIST_ITEMS_LOAD_SUCCESS:
            return {
                items: action.payload
            };    
        case WISHLIST_ACTION_TYPES.WISHLIST_ITEMS_LOAD_FAILURE: 
            return {
                ...state,
                loadErrorMsg: action.payload
            };
        case WISHLIST_ACTION_TYPES.ADD_ITEM_TO_WISHLIST_REQUEST:
            return {
                ...state,
                loading: true,
                loadingProductId: action.payload
            };
        case WISHLIST_ACTION_TYPES.ADD_ITEM_TO_WISHLIST_SUCCESS:
            return {
                items: [...state.items, action.payload]
            };
        case WISHLIST_ACTION_TYPES.ADD_ITEM_TO_WISHLIST_FAILURE:
            return {
                items: state.items,
                errorMsg: action.payload  
            };
        case WISHLIST_ACTION_TYPES.DELETE_ITEM_FROM_WISHLIST_REQUEST:
            return {
                ...state,
                deleting: true,
                deletingProductId: action.payload
            };
        case WISHLIST_ACTION_TYPES.DELETE_ITEM_FROM_WISHLIST_SUCCESS:
            return {
                items: state.items.filter((productEntry) => productEntry.product._id !== action.payload)
            };
        case WISHLIST_ACTION_TYPES.DELETE_ITEM_FROM_WISHLIST_FAILURE:
            return {
                items: state.items,
                errorMsg: action.payload
            };
        case WISHLIST_ACTION_TYPES.CLEAR_WISHLIST_SUCCESS:
            return {
                items: []
            };
        case WISHLIST_ACTION_TYPES.CLEAR_WISHLIST_FAILURE:
            return {
                ...state,
                errorClearWishlistMsg: action.payload
            };
        default:
            return state;    
    }
};