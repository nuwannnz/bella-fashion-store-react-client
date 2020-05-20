import * as staffService from "../../../services/admin/staff.service";
import { displayTimeoutNotificationAsync } from "./notification.actions";
import { MESSAGE_STRINGS } from "../../../resources/Strings";
import { ROUTE_PATHS } from "../../../constants";
import {
  saveStaffInfoToStorage,
  deleteAdminTokenFromStorage,
} from "../../../helpers/token.helper";
import { history } from "../../../helpers/navigation.helper";
import { buildNotification } from "../../../services/customer/notification.service";

export const STAFF_ACTION_TYPES = {
  LOGGED_IN: "LOGGED_IN",
  LOGGED_OUT: "LOGGED_OUT",
  LOGIN_UI_ERROR_MSG: "LOGIN_UI_ERROR_MSG",
  CLEAR_LOGIN_UI_ERROR_MSG: "CLEAR_LOGIN_ERROR",
  LOGIN_UI_SUCCESS_MSG: "LOGIN_UI_SUCCESS_MSG",
  CLEAR_LOGIN_UI_SUCCESS_MSG: "CLEAR_LOGIN_UI_SUCCESS_MSG",
  USER_INFO_LOADED: "USER_INFO_LOADED",
  LOGIN_UI_IS_LOADING: "LOGIN_UI_IS_LOADING",
  HAS_ADMIN_CHANGED: "HAS_ADMIN_CHANGED",
  TOKEN_VERIFICATION_COMPLETED: "TOKEN_VERIFICATION_COMPLETED",
  HAS_ADMIN_CHECK_COMPLETED: "HAS_ADMIN_CHECK_COMPLETED",
};

// action creators

export const loggedIn = (token) => ({
  type: STAFF_ACTION_TYPES.LOGGED_IN,
  payload: token,
});

export const loggedOut = () => ({
  type: STAFF_ACTION_TYPES.LOGGED_OUT,
});

const loginUiErrorMsg = (msg) => ({
  type: STAFF_ACTION_TYPES.LOGIN_UI_ERROR_MSG,
  payload: msg,
});

export const clearLogginUiErrorMsg = () => ({
  type: STAFF_ACTION_TYPES.CLEAR_LOGIN_UI_ERROR_MSG,
});

export const loginUiSuccessMsg = (msg) => ({
  type: STAFF_ACTION_TYPES.LOGIN_UI_SUCCESS_MSG,
  payload: msg,
});

export const clearLoginUiSuccessMessage = () => ({
  type: STAFF_ACTION_TYPES.CLEAR_LOGIN_UI_SUCCESS_MSG,
});

export const userLoaded = (user) => ({
  type: STAFF_ACTION_TYPES.USER_INFO_LOADED,
  payload: user,
});

export const isLoading = (val) => ({
  type: STAFF_ACTION_TYPES.LOGIN_UI_IS_LOADING,
  payload: val,
});

export const hasAdminChanged = (val) => ({
  type: STAFF_ACTION_TYPES.HAS_ADMIN_CHANGED,
  payload: val,
});

const hasAdminChecked = () => ({
  type: STAFF_ACTION_TYPES.HAS_ADMIN_CHECK_COMPLETED,
});

const tokenVerificationCompleted = () => ({
  type: STAFF_ACTION_TYPES.TOKEN_VERIFICATION_COMPLETED,
});

// async actions

export function loginAsync(email, password) {
  return async (dispatch, getState) => {
    // set isLoading to true
    dispatch(isLoading(true));

    // clear error/success messages, if there any
    dispatch(clearLogginUiErrorMsg());

    // get result from API
    const result = await staffService.login(email, password);

    if (result.isResultOk() && result.data.isAuth) {
      // login success

      // set user info
      dispatch(userLoaded(result.data.user));
      // set token
      dispatch(loggedIn(result.data.token));

      // save token in local storage
      const userInfo = {
        token: result.data.token,
        userId: result.data.user.id,
      };
      saveStaffInfoToStorage(userInfo);

      history.push(ROUTE_PATHS.ADMIN_DASHBOARD);
    } else {
      // login failed

      // set login error
      dispatch(
        loginUiErrorMsg(
          "Invalid email and password combination. Please try again."
        )
      );
    }

    dispatch(clearLoginUiSuccessMessage());
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
  };
}

export function signUpAdminAsync(email, fName, lName, history) {
  return async (dispatch, getState) => {
    // set isLoading to true
    dispatch(isLoading(true));
    dispatch(loginUiErrorMsg());

    // clear error messages
    dispatch(clearLogginUiErrorMsg());

    // get result from API
    const result = await staffService.signUpAdmin(email, fName, lName);

    if (result.isResultOk()) {
      // signup success
      // send user to the login page
      dispatch(
        loginUiSuccessMsg(
          `A temporary password has been sent to ${email}. Please use it login.`
        )
      );

      history.push(ROUTE_PATHS.ADMIN_LOGIN);
      dispatch(hasAdminChanged(true));
    } else {
      // error

      // set error message
      dispatch(loginUiErrorMsg(result.errorMessage));

      // display an error notification
      displayTimeoutNotificationAsync(
        buildNotification(MESSAGE_STRINGS.STAFF_ADMIN_SIGNUP_FAILED)
      );
    }
    // set isLoading to false
    dispatch(isLoading(false));
  };
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

    dispatch(tokenVerificationCompleted());
  };
}

export function checkHasAdminAsync() {
  return async (dispatch, getState) => {
    //
    const hasAdmin = await staffService.getHasAdmin();
    if (!hasAdmin) {
      dispatch(hasAdminChanged(false));
    }

    dispatch(hasAdminChecked());
  };
}

export function updateTempPasswordAsync(newPassword) {
  return async (dispatch, getState) => {
    dispatch(isLoading(true));

    // get state from the state
    const { token } = getState().staffLogin.auth;
    if (!token) {
      return;
    }

    const result = await staffService.updateTempPassword(token, newPassword);

    if (result.isResultOk() && result.data.success) {
      // fetch user again again
      // dispatch(loggedOut());
      // dispatch(updatedTempPassword());
      dispatch(verifyStoredTokenAsync());
    } else {
      // display error notification
      displayTimeoutNotificationAsync(
        buildNotification(MESSAGE_STRINGS.STAFF_PASSWORD_UPDATE_FAILED)
      );
      return;
    }
  };
}
