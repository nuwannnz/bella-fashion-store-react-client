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
                return {
                    ...state,
                    brands:[ action.payload, ...state.brands]
                }
            case BRAND_ACTION_TYPES.BRAND_DELETED:
                return {
                    ...state,
                    brands: [...state.brands.filter(b => b._id  !== action.payload)]
                }
        default:
            return state;
    }
}