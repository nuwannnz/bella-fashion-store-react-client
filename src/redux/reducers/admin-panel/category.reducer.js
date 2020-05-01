import {CATEGORY_ACTION_TYPES} from "../../actions/admin-panel/category.actions";

const initialState = {
    categories: []
}

export const category = (state = initialState, action) => {

    switch (action.type) {

        case CATEGORY_ACTION_TYPES.CATEGORIES_LOADED:
            return {
                ...state,
                category: action.payload
            }

        default: 
            return state;
    }
}