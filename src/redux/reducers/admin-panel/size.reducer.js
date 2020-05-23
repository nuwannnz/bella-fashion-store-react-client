import { SIZE_ACTION_TYPES } from "../../actions/admin-panel/size.actions";

const initialState = {
    sizes: [],
    loading: false
}

export const size = (state = initialState, action) => {
    switch(action.type) {
        case SIZE_ACTION_TYPES.SIZE_INFO_LOADED:
            return {
                ...state,
                sizes: action.payload
            }
            case SIZE_ACTION_TYPES.SIZE_LOADING:
            return {
                ...state,
                loading: action.payload
            }
            case SIZE_ACTION_TYPES.SIZE_ADDED:
                return {
                    ...state,
                    sizes:[ action.payload, ...state.sizes]
                }
            case SIZE_ACTION_TYPES.SIZE_DELETED:
                return {
                    ...state,
                    sizes: [...state.sizes.filter(s => s._id  !== action.payload)]
                }
        default:
            return state;
    }
}