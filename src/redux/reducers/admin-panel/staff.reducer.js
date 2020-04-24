import { STAFF_ACTION_TYPES } from "../../actions/admin-panel/staff.actions";

const initialState = {
  hasLogginError: false,
  signUpErrorMsg: "",
  token: null,
  userInfo: null,
  updatedTempPassword: false,
  isLoading: false,
  adminSignUpSuccess: false,
  hasAdmin: true
};

export const staff = (state = initialState, action) => {
  switch (action.type) {
    case STAFF_ACTION_TYPES.LOGGED_IN:
      return {
        ...state,
        token: action.payload,
      };

    case STAFF_ACTION_TYPES.LOGGED_OUT:
      return {
        ...state,
        token: null,
        userInfo: null,
        updatedTempPassword: false,
      };

    case STAFF_ACTION_TYPES.LOGIN_ERROR:
      return {
        ...state,
        hasLogginError: true,
      };

    case STAFF_ACTION_TYPES.CLEAR_LOGIN_ERROR:
      return {
        ...state,
        hasLogginError: false,
      };

    case STAFF_ACTION_TYPES.USER_INFO_LOADED:
      return {
        ...state,
        userInfo: action.payload,
      };

    case STAFF_ACTION_TYPES.UPDATED_TEMP_PASSWORD:
      return {
        ...state,
        updatedTempPassword: true,
      };

    case STAFF_ACTION_TYPES.SIGNUP_ERROR_MSG:
      return {
        ...state,
        signUpErrorMsg: action.payload
      }

    case STAFF_ACTION_TYPES.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    case STAFF_ACTION_TYPES.HAS_ADMIN:
      return {
        ...state,
        hasAdmin: action.payload
      }
    default:
      return state;
  }
};
