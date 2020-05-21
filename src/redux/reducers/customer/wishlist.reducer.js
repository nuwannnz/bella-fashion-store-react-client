import { WISHLIST_ACTION_TYPES } from "../../actions/customer/wishlist.action";

const initialState = {
    items: [],
};

export const wishlist = (state = initialState, action) => {
    switch(action.type) {
        case WISHLIST_ACTION_TYPES.WISHLIST_ITEM_LOAD_REQUEST:
            return {
                ...state,
                loading: true
            };

        case WISHLIST_ACTION_TYPES.WISHLIST_ITEM_LOAD_SUCCESS:
            return {
                items: action.payload
            };    

        default:
            return state;    
    }
};