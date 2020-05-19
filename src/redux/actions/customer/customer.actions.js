import * as customerService from "../../../services/customer/customer.service";
import { displayTimeoutNotificationAsync } from "./notification.actions";
import { buildNotification } from "../../../services/customer/notification.service";
import { MSG_STRINGS } from "../../../resources/Strings";
import { ROUTE_PATHS } from "../../../constants";
import { saveCustomerTokenToStorage, deleteCustomerTokenFromStorage } from "../../../helpers/token.helper";
import { uiIsLoading } from "../ui.actions";
import { USER_DASHBOAR_ACTION_TYPES } from "../admin-panel/user-dashboard/user.actions";

export const CUSTOMER_ACTION_TYPES = {
    LOGGED_IN: "LOGGED_IN",
    LOGIN_ERROR: "LOGGIN_ERROR",
    SIGNUP_ERROR_MSG: "SIGNUP_ERROR_MSG",
    LOGGED_OUT: "LOGGED_OUT",
    CLEAR_LOGIN_ERROR: "CLEAR_LOGIN_ERROR",
    CUSTOMER_INFO_LOADED: "CUSTOMER_INFO_LOADED",
    CUSTOMER_SIGN_UP_SUCCEDED: 'CUSTOMER_SIGN_UP_SUCCEDED',
    HAS_CUSTOMER: "HAS_CUSTOMER",
    IS_LOADING: 'IS_LOADING',
    TOKEN_VERIFICATION_COMPLETED: "TOKEN_VERIFICATION_COMPLETED",
    HAS_CUSTOMER_CHECK_COMPLETED: "HAS_CUSTOMER_CHECK_COMPLETED",

    ADD_ADDRESS_REQUEST: "ADD_ADDRESS_REQUEST",
    ADD_ADDRESS_SUCCESS: "ADD_ADDRESS_SUCCESS",
    ADD_ADDRESS_FAILURE: "ADD_ADDRESS_FAILURE",

    DELETE_ADDRESS_REQUEST: "DELETE_ADDRESS_REQUEST",
    DELETE_ADDRESS_SUCCESS: "DELETE_ADDRESS_SUCCESS",
    DELETE_ADDRESS_FAILURE: "DELETE_ADDRESS_FAILURE",

    UPDATE_ADDRESS_REQUEST: "UPDATE_ADDRESS_REQUEST",
    UPDATE_ADDRESS_SUCCESS: "UPDATE_ADDRESS_SUCCESS",
    UPDATE_ADDRESS_FAILURE: "UPDATE_ADDRESS_FAILURE",

    UPDATE_CUSTOMER_INFO_REQUEST: "UPDATE_CUSTOMER_INFO_REQUEST",
    UPDATE_CUSTOMER_INFO_SUCCESS: "UPDATE_CUSTOMER_INFO_SUCCESS",
    UPDATE_CUSTOMER_INFO_FAILURE: "UPDATE_CUSTOMER_INFO_FAILURE"
};

// action creators

export const loggedIn = (token) => ({
      type: CUSTOMER_ACTION_TYPES.LOGGED_IN,
      payload: token
});

const loginError = () => ({
      type: CUSTOMER_ACTION_TYPES.LOGIN_ERROR
});

const setSignUpErrorMsg = (msg) => ({
      type: CUSTOMER_ACTION_TYPES.SIGNUP_ERROR_MSG,
      payload: msg
});

export const customerLoaded = (customer) => ({
      type: CUSTOMER_ACTION_TYPES.CUSTOMER_INFO_LOADED,
      payload: customer
});

export const hasCustomerAction = (val) => ({
      type: CUSTOMER_ACTION_TYPES.HAS_CUSTOMER,
      payload: val
});
 
export const loggedOut = () => ({
    type: CUSTOMER_ACTION_TYPES.LOGGED_OUT,
});

export const clearLogginError = () => ({
    type: CUSTOMER_ACTION_TYPES.CLEAR_LOGIN_ERROR,
});

export const isLoading = (val) => ({
  type: CUSTOMER_ACTION_TYPES.IS_LOADING,
  payload:val
});

const tokenVerificationCompleted = () => ({
  type: CUSTOMER_ACTION_TYPES.TOKEN_VERIFICATION_COMPLETED
});

const hasCustomerChecked = () => ({
  type: CUSTOMER_ACTION_TYPES.HAS_CUSTOMER_CHECK_COMPLETED
});


// async actions

export function loginAsync(email, password, history) {
    return async(dispatch, getState) => {
        // set isLoading to true
        dispatch(uiIsLoading(true));

        // get result from API
        const result = await customerService.login(email, password);

        if(result.isResultOk() && result.data.isAuth) {
            // login success

            // set token
            dispatch(loggedIn(result.data.token));
            // set user info
            dispatch(customerLoaded(result.data.customer));

            history.push(ROUTE_PATHS.CUSTOMER_DASHBOARD);

            // save token in local storage
            saveCustomerTokenToStorage(result.data.token);
        } else {
             // login failed

            // set login error 
            dispatch(loginError());
        }

        // set isLoading to false
        dispatch(uiIsLoading(false));
    }
};

export function logoutAsync(history) {
    return async (dispatch, getState) => {
      
      // delete token from storage
      deleteCustomerTokenFromStorage();
  
      // delete token from state
      dispatch(loggedOut());

      history.push(ROUTE_PATHS.CUSTOMER_LOGIN);
    }
};

  export function signUpCustomerAsync(fullName, email, password) {
    return async (dispatch, getState) => {
        // set isLoading to true
        dispatch(uiIsLoading(true));

        // clear error messages
        dispatch(setSignUpErrorMsg(""));

        // get result from API
        const result = await customerService.signUpCustomer(fullName, email, password);

        if(result.isResultOk()) {
            // signup success
            // send user to the login page
            document.location.pathname = ROUTE_PATHS.CUSTOMER_LOGIN; 
        } else {
            // error

            // set error message
            dispatch(setSignUpErrorMsg(result.errorMessage));

            // display an error notification
            displayTimeoutNotificationAsync(
                buildNotification(MSG_STRINGS.CUSTOMER_SIGNUP_FAILED)
            );
        }
        // set isLoading to false
        dispatch(uiIsLoading(false));
    }
};

  // check wether the stored token is valid
export function verifyStoredTokenAsync() {
    return async (dispatch, getState) => {
      //
      const result = await customerService.verifyStoredToken();
      if (result !== null) {
        // stored token is verified
        dispatch(customerLoaded(result.customerInfo));
        dispatch(loggedIn(result.token));
      }
      dispatch(tokenVerificationCompleted());
    }
};

export function checkHasCustomerAsync() {
    return async (dispatch, getState) => {
      //
      const hasCustomer = await customerService.getHasCustomer();
      if (!hasCustomer) {
        dispatch(hasCustomerAction(false));
      }

      dispatch(hasCustomerChecked());
    }
};

export function addAddressAsync(addressDto) {
  console.log(addressDto);
  
  return async (dispatch, getState) => {
    dispatch(request());
    const { token } = getState().customer;

    const result = await customerService.addAddress(token, addressDto);

    if(result.isResultOk()) {
      dispatch(success(result.data));
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function request() {
    return {
      type: CUSTOMER_ACTION_TYPES.ADD_ADDRESS_REQUEST
    };
  }

  function success(payload) {
    return {
      type: CUSTOMER_ACTION_TYPES.ADD_ADDRESS_SUCCESS,
      payload
    };
  }

  function failure(errorMsg) {
    return {
      type: CUSTOMER_ACTION_TYPES.ADD_ADDRESS_FAILURE,
      payload: errorMsg
    };
  }
};

export function deleteAddressAsync(addressId) {
  console.log("Delete" + addressId);
  
  return async (dispatch, getState) => {
    dispatch(request({ id: addressId }));
    const { token } = getState().customer;

    const result = await customerService.deleteCustomerAddress(token, addressId);

    if(result.isResultOk()) {
      dispatch(success(addressId));
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function request(payload) {
    return {
      type: CUSTOMER_ACTION_TYPES.DELETE_ADDRESS_REQUEST, 
      payload
    };
  }
  
  function success(payload) {
    return {
      type: CUSTOMER_ACTION_TYPES.DELETE_ADDRESS_SUCCESS,
      payload
    };
  } 

  function failure(errorMsg) {
    return {
      type: CUSTOMER_ACTION_TYPES.DELETE_ADDRESS_FAILURE,
      payload: errorMsg
    };
  }
};

export function updateCustomerAddressAsync( addressId, addressDto) {
  return async (dispatch, getState) => {
    dispatch(request(addressId));
    const { token } = getState().customer;

    const result = await customerService.updateCustomerAddress(token, addressId, addressDto);

    if(result.isResultOk()) {
      dispatch(success(result.data));
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function request(payload) {
    return {
      type: CUSTOMER_ACTION_TYPES.UPDATE_ADDRESS_REQUEST,
      payload
    };
  }

  function success(payload) {
    return {
      type: CUSTOMER_ACTION_TYPES.UPDATE_ADDRESS_SUCCESS,
      payload
    };
  }

  function failure(errorMsg) {
    return {
      type: CUSTOMER_ACTION_TYPES.UPDATE_ADDRESS_FAILURE,
      payload: errorMsg
    };
  }
};

export function updateCustomerInfoAsync(customerInfo) {
  return async (dispatch, getState) => {
    dispatch(request());
    const { token } = getState().customer;

    const result = await customerService.updateCustomerInfo(token, customerInfo);

    if(result.isResultOk()) {
      dispatch(success(result.data));
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function request() {
    return {
      type: CUSTOMER_ACTION_TYPES.UPDATE_CUSTOMER_INFO_REQUEST
    };
  }

  function success(payload) {
    return {
      type: CUSTOMER_ACTION_TYPES.UPDATE_CUSTOMER_INFO_SUCCESS,
      payload
    };
  }

  function failure(errorMsg) {
    return {
      type: CUSTOMER_ACTION_TYPES.UPDATE_CUSTOMER_INFO_FAILURE,
      payload: errorMsg
    };
  }
}