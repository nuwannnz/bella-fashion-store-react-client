import { UI_ACTION_TYPES } from "../actions/ui.actions";


const initialState = {
    isLoading: false,
};

export const ui = (state = initialState, action) => {

    switch (action.type) {
        case UI_ACTION_TYPES.UI_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }


        default:
            return state;
    }
};
