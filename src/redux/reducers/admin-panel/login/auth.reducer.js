import { STAFF_ACTION_TYPES } from "../../../actions/admin-panel/staff.actions";

const initialState = {
    token: null,
    userInfo: null,
    tokenVerified: false
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case STAFF_ACTION_TYPES.LOGGED_IN:
            return {
                ...state,
                token: action.payload,
            };

        case STAFF_ACTION_TYPES.LOGGED_OUT:
            return {
                token: null,
                userInfo: null,
            };



        case STAFF_ACTION_TYPES.USER_INFO_LOADED:
            return {
                ...state,
                userInfo: action.payload,
            };

        case STAFF_ACTION_TYPES.TOKEN_VERIFICATION_COMPLETED:
            return {
                ...state,
                tokenVerified: true
            }

        default:
            return state;
    }
};
