import {CUSTOMER_CATEGORY_ACTION_TYPES} from "../../actions/customer/customer.category.actions";
import logger from "../../../helpers/logger.helper";

const initialState = {
    categories: []
}

export const category = (state = initialState, action) => {
    logger.info("Runing customer category reducer", state);
    switch (action.type) {

        case CUSTOMER_CATEGORY_ACTION_TYPES.CATEGORY_INFO_LOADED:
            return {
                ...state,
                categories: action.payload
            }

            default: 
            return state;
    }
}