import {CATEGORY_ACTION_TYPES} from "../../actions/admin-panel/category.actions";
import logger from "../../../helpers/logger.helper";

const initialState = {
    categories: []
}

export const category = (state = initialState, action) => {
    logger.info("Runing category reducer", state);
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