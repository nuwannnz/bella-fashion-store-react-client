import {UI_ACTION_TYPES} from "../actions/category.ui.actions";

const initialState = {
    isLoading: false
}

export const categoryUI = (state = initialState, action) => {

    switch (action.type) {

        case UI_ACTION_TYPES.DATA_LOADING_STARTED:
            return {
                isLoading:true
            }

        case UI_ACTION_TYPES.DATA_LOADING_FINISHED:
            return {
                isLoading:false
            }

        default: 
            return state;
    }
}