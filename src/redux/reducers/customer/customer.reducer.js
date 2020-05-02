import { CUSTOMER_ACTION_TYPES } from "../../actions/customer/customer.actions";

const initialState = {
  hasLogginError: false,
  signUpErrorMsg: "",
  token: null,
  customerInfo: null,
  customerSignUpSuccess: false,
  hasCustomer: true
};

export const customer = (state = initialState, action) => {
    switch (action.type) {
      case CUSTOMER_ACTION_TYPES.LOGGED_IN:
        return {
          ...state,
          token: action.payload,
        };
  
      case CUSTOMER_ACTION_TYPES.LOGGED_OUT:
        return {
          ...state,
          token: null,
          customerInfo: null
        };
  
      case CUSTOMER_ACTION_TYPES.LOGIN_ERROR:
        return {
          ...state,
          hasLogginError: true,
        };
  
      case CUSTOMER_ACTION_TYPES.CLEAR_LOGIN_ERROR:
        return {
          ...state,
          hasLogginError: false,
        };
  
      case CUSTOMER_ACTION_TYPES.CUSTOMER_INFO_LOADED:
        return {
          ...state,
          customerInfo: action.payload,
        };
  
      case CUSTOMER_ACTION_TYPES.SIGNUP_ERROR_MSG:
        return {
          ...state,
          signUpErrorMsg: action.payload
        }
  
      case CUSTOMER_ACTION_TYPES.HAS_CUSTOMER:
        return {
          ...state,
          hasCustomer: action.payload
        }
      default:
        return state;
    }
  };