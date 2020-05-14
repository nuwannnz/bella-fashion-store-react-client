import { CUSTOMER_ACTION_TYPES } from "../../actions/customer/customer.actions";

const initialState = {
  hasLogginError: false,
  signUpErrorMsg: "",
  token: null,
  tokenVerified: false,
  customerInfo: null,
  customerSignUpSuccess: false,
  isLoading: false,
  hasCustomer: true,
  checkedHasCustomer: false,
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

      case CUSTOMER_ACTION_TYPES.IS_LOADING:
        return {
          ...state,
          isLoading: action.payload
        }  

      case CUSTOMER_ACTION_TYPES.TOKEN_VERIFICATION_COMPLETED:
        return {
          ...state,
          tokenVerified: true
        }  

      case CUSTOMER_ACTION_TYPES.HAS_CUSTOMER_CHECK_COMPLETED:
        return {
          ...state,
          checkedHasCustomer: true
        } 

      case CUSTOMER_ACTION_TYPES.ADD_ADDRESS_REQUEST:
        return {
          ...state,
          addingAddress: true
        };
        
      case CUSTOMER_ACTION_TYPES.ADD_ADDRESS_SUCCESS:
        const customerInfo = state.customerInfo;
        customerInfo.addresses.push(action.payload);
        return {
          ...state,
          customerInfo,
          closePopups: true
        };

      case CUSTOMER_ACTION_TYPES.ADD_ADDRESS_FAILURE:
        return {
          ...state,
          addAddressError: action.payload
        };
       
      case CUSTOMER_ACTION_TYPES.DELETE_ADDRESS_REQUEST:
        return {
          ...state,
          deletingAddress: action.payload
        }; 
      
      case CUSTOMER_ACTION_TYPES.DELETE_ADDRESS_SUCCESS:
        const info = state.customerInfo;
        info.addresses = info.addresses.filter(addr => addr._id !== action.payload);
        return {
          ...state,
          info
        };

      case CUSTOMER_ACTION_TYPES.DELETE_ADDRESS_FAILURE:
        return {
          ...state,
          deleteAddressError: action.payload
        }; 
      default:
        return state;
    }

  };