import * as customerService from "../../../services/customer/customer.service";
import { displayTimeoutNotificationAsync } from "./notification.actions";
import { buildNotification } from "../../../services/customer/notification.service";
import { MSG_STRINGS } from "../../../resources/Strings";
import { ROUTE_PATHS } from "../../../constants";
import { saveCustomerTokenToStorage, deleteCustomerTokenFromStorage } from "../../../helpers/token.helper";

export const CUSTOMER_ACTION_TYPES = {
    LOGGED_IN: "LOGGED_IN",
    LOGIN_ERROR: "LOGGIN_ERROR",
    SIGNUP_ERROR_MSG: "SIGNUP_ERROR_MSG",
    LOGGED_OUT: "LOGGED_OUT",
    CLEAR_LOGIN_ERROR: "CLEAR_LOGIN_ERROR",
    CUSTOMER_INFO_LOADED: "CUSTOMER_INFO_LOADED",
    CUSTOMER_SIGN_UP_SUCCEDED: 'CUSTOMER_SIGN_UP_SUCCEDED',
    HAS_CUSTOMER: "HAS_CUSTOMER"
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

// async actions

export function loginAsync(email, password) {
    return async(dispatch, getState) => {
        // get result from API
        const result = await customerService.login(email, password);

        if(result.isResultOk() && result.data.isAuth) {
            // login success

            // set token
            dispatch(loggedIn(result.data.token));
            // set user info
            dispatch(customerLoaded(result.data.customer));

            // save token in local storage
            saveCustomerTokenToStorage(result.data.token);
        } else {
             // login failed

            // set login error 
            dispatch(loginError());
        }
    }
};

export function logoutAsync() {
    return async (dispatch, getState) => {
      // delete token from storage
      deleteCustomerTokenFromStorage();
  
      // delete token from state
      dispatch(loggedOut());
    }
};

  export function signUpCustomerAsync(fullName, email, password) {
    return async (dispatch, getState) => {
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
    }
};

export function checkHasCustomerAsync() {
    return async (dispatch, getState) => {
      //
      const hasCustomer = await customerService.getHasCustomer();
      if (!hasCustomer) {
        dispatch(hasCustomerAction(false));
      }
    }
};