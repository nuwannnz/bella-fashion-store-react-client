import { BRAND_ACTION_TYPES } from "../../actions/admin-panel/brand.actions";

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
            case BRAND_ACTION_TYPES.BRAND_ADDED:
                return{
                    ...state,
                    products:[ action.payload, ...state.brands]
                }
        default:
            return state;
    }
}