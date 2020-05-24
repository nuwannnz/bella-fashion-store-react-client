import { BANNER_ACTION_TYPES } from "../actions/banners.actions";

const initialState = {
    banners: [],
    categoryBanners: []
}

export const homepage = (state = initialState, action) => {
    switch (action.type) {
        case BANNER_ACTION_TYPES.LOAD_BANNERS:
            return {
                ...state,
                banners: action.payload
            }
        case BANNER_ACTION_TYPES.LOAD_CATEGORY_BANNERS:
            return {
                ...state,
                categoryBanners: action.payload
            }

        case BANNER_ACTION_TYPES.ADD_BANNER:
            return {
                ...state,
                banners: [...state.banners, action.payload]
            }
        case BANNER_ACTION_TYPES.ADD_CATEGORY_BANNER:
            return {
                ...state,
                categoryBanners: [...state.categoryBanners, action.payload]
            }

        case BANNER_ACTION_TYPES.DELETE_BANNER:
            return {
                ...state,
                banners: [...state.banners.filter(b => b._id !== action.payload)]
            }

        case BANNER_ACTION_TYPES.DELETE_CATEGORY_BANNER:
            return {
                ...state,
                categoryBanners: [...state.categoryBanners.filter(b => b._id !== action.payload)]
            }


        default:
            return state;
    }
}