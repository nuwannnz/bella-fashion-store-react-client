import {CATEGORY_ACTION_TYPES} from "../../actions/admin-panel/category.actions";
import logger from "../../../helpers/logger.helper";

const initialState = {
    categories: []
}

export const category = (state = initialState, action) => {
    logger.info("Runing category reducer", state);
    switch (action.type) {

        case CATEGORY_ACTION_TYPES.CATEGORY_INFO_LOADED:
            return {
                ...state,
                categories: action.payload
            }

            case CATEGORY_ACTION_TYPES.NEWCATEGORY_CREATED:
                return{
                    ...state,
                    categories:[ action.payload, ...state.categories]
                }

                case CATEGORY_ACTION_TYPES.NEWCATEGORY_DELETED:
                    return{
                        ...state,
                        categories:state.categories.filter(p => p._id  !== action.payload)
                    }

                    case CATEGORY_ACTION_TYPES.NEWSUBCATEGORY_CREATED:
                        return{
                            ...state,
                            categories: state.categories.map(cat => cat._id === action.payload._id ? action.payload : cat )
                        }

        default: 
            return state;
    }
}