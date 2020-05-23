import { SIZE_ACTION_TYPES } from "../../actions/customer/size.actions";

const initialState = {

    sizes: []

}

export const size = (state = initialState, action) => {
    switch(action.type) {
        case SIZE_ACTION_TYPES.SIZE_INFO_LOADED:
            return {
                ...state,
                sizes: action.payload
            }
        default:
            return state;
    }
}