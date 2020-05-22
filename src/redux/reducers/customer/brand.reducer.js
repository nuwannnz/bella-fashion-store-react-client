import { BRAND_ACTION_TYPES } from "../../actions/customer/brand.actions";

const initialState = {

    brands: []

}

export const brand = (state = initialState, action) => {
    switch(action.type) {
        case BRAND_ACTION_TYPES.BRAND_INFO_LOADED:
            return {
                ...state,
                brands: action.payload
            }
        default:
            return state;
    }
}