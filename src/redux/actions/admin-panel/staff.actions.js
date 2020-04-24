import * as staffService from "../../../services/admin/staff.service";
import { displayTimeoutNotificationAsync } from "./notification.actions";
import { buildNotification } from "../../../services/admin/notification.service";
import { MESSAGE_STRINGS } from "../../../resources/Strings";
import { ROUTE_PATHS } from "../../../Constants";
import { saveAdminTokenToStorage, deleteAdminTokenFromStorage } from "../../../helpers/token.helper";

export const STAFF_ACTION_TYPES = {
  LOGGED_IN: "LOGGED_IN",
  LOGIN_ERROR: "LOGGIN_ERROR",
  SIGNUP_ERROR_MSG: "SIGNUP_ERROR_MSG",
  LOGGED_OUT: "LOGGED_OUT",
  CLEAR_LOGIN_ERROR: "CLEAR_LOGIN_ERROR",
  USER_INFO_LOADED: "USER_INFO_LOADED",
  UPDATED_TEMP_PASSWORD: "UPDATED_TEMP_PASSWORD",
  ADMIN_SIGN_UP_SUCCEDED: 'ADMIN_SIGN_UP_SUCCEDED',
  IS_LOADING: 'IS_LOADING',
  HAS_ADMIN: "HAS_ADMIN"
};

// action creators

export const loggedIn = (token) => ({
  type: STAFF_ACTION_TYPES.LOGGED_IN,
  payload: token,
});

const loginError = () => ({
  type: STAFF_ACTION_TYPES.LOGIN_ERROR,
});

const setSignupErrorMsg = (msg) => ({
  type: STAFF_ACTION_TYPES.SIGNUP_ERROR_MSG,
  payload: msg
})

export const userLoaded = (user) => ({
  type: STAFF_ACTION_TYPES.USER_INFO_LOADED,
  payload: user,
});

export const isLoading = (val) => ({
  type: STAFF_ACTION_TYPES.IS_LOADING,
  payload: val
})

export const hasAdminAction = (val) => ({
  type: STAFF_ACTION_TYPES.HAS_ADMIN,
  payload: val
})

const updatedTempPassword = () => ({
  type: STAFF_ACTION_TYPES.UPDATED_TEMP_PASSWORD,
});


export const loggedOut = () => ({
  type: STAFF_ACTION_TYPES.LOGGED_OUT,
});

export const clearLogginError = () => ({
  type: STAFF_ACTION_TYPES.CLEAR_LOGIN_ERROR,
});

// async actions

export function loginAsync(email, password) {
  return async (dispatch, getState) => {

    // set isLoading to true
    dispatch(isLoading(true));

    // get result from API
    const result = await staffService.login(email, password);

    if (result.isResultOk() && result.data.isAuth) {
      // login success

      // set token
      dispatch(loggedIn(result.data.token));
      // set user info
      dispatch(userLoaded(result.data.user));

      // save token in local storage
      saveAdminTokenToStorage(result.data.token);

    } else {
      // login failed

      // set login error 
      dispatch(loginError());

    }
    // set isLoading to false
    dispatch(isLoading(false));
  };
}

export function logoutAsync() {
  return async (dispatch, getState) => {
    // delete token from storage
    deleteAdminTokenFromStorage();

    // delete token from state
    dispatch(loggedOut());
  }
}

export function signUpAdminAsync(email, fName, lName) {
  return async (dispatch, getState) => {
    // set isLoading to true
    dispatch(isLoading(true));

    // clear error messages
    dispatch(setSignupErrorMsg(""));

    // get result from API
    const result = await staffService.signUpAdmin(email, fName, lName);

    if (result.isResultOk()) {
      // signup success
      // send user to the login page
      document.location.pathname = ROUTE_PATHS.ADMIN_LOGIN;

    } else {
      // error

      // set error message
      dispatch(setSignupErrorMsg(result.errorMessage));

      // display an error notification
      displayTimeoutNotificationAsync(
        buildNotification(MESSAGE_STRINGS.STAFF_ADMIN_SIGNUP_FAILED)
      );
    }
    // set isLoading to false
    dispatch(isLoading(false));
  }
}

// check wether the stored token is valid
export function verifyStoredTokenAsync() {
  return async (dispatch, getState) => {
    //
    const result = await staffService.verifyStoredToken();
    if (result !== null) {
      // stored token is verified
      dispatch(userLoaded(result.userInfo));
      dispatch(loggedIn(result.token));
    }
  }
}

export function checkHasAdminAsync() {
  return async (dispatch, getState) => {
    //
    const hasAdmin = await staffService.getHasAdmin();
    if (!hasAdmin) {
      dispatch(hasAdminAction(false));
    }
  }
}

export function updateTempPassword(newPassword) {
  return async (dispatch, getState) => {
    // get state from the state
    const { token } = getState().staff;
    if (!token) {
      return;
    }

    const result = await staffService.updateTempPassword(token, newPassword);
    if (result !== null && result.success) {
      // logout and make user login again
      dispatch(loggedOut());
      dispatch(updatedTempPassword());
    } else {
      // display error notification
      displayTimeoutNotificationAsync(
        buildNotification(MESSAGE_STRINGS.STAFF_PASSWORD_UPDATE_FAILED)
      );
      return;
    }
  };
}
