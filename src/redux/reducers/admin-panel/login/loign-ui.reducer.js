import { STAFF_ACTION_TYPES } from "../../../actions/admin-panel/staff.actions";

const initialState = {
    errorMsg: '',
    successMsg: '',
    isLoading: false,
    hasAdmin: true,
    checkedHasAdmin: false
};

export const loginUi = (state = initialState, action) => {
    switch (action.type) {

        case STAFF_ACTION_TYPES.LOGIN_UI_ERROR_MSG:
            return {
                ...state,
                errorMsg: action.payload,
            };

        case STAFF_ACTION_TYPES.CLEAR_LOGIN_UI_ERROR_MSG:
            return {
                ...state,
                errorMsg: '',
            };

        case STAFF_ACTION_TYPES.LOGIN_UI_SUCCESS_MSG:
            return {
                ...state,
                successMsg: action.payload
            }

        case STAFF_ACTION_TYPES.CLEAR_LOGIN_UI_SUCCESS_MSG:
            return {
                ...state,
                successMsg: ''
            }


        case STAFF_ACTION_TYPES.LOGIN_UI_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }

        case STAFF_ACTION_TYPES.HAS_ADMIN_CHANGED:
            return {
                ...state,
                hasAdmin: action.payload
            }

        case STAFF_ACTION_TYPES.HAS_ADMIN_CHECK_COMPLETED:
            return {
                ...state,
                checkedHasAdmin: true
            }
        default:
            return state;
    }
};
