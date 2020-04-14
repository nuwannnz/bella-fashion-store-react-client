import * as staffService from "../../../services/admin/staff.service";
import { displayTimeoutNotificationAsync } from "./notification.actions";
import { buildNotification } from "../../../services/admin/notification.service";
import { MESSAGE_STRINGS } from "../../../resources/Strings";

export const STAFF_ACTION_TYPES = {
  LOGGED_IN: "LOGGED_IN",
  LOGIN_ERROR: "LOGGIN_ERROR",
  LOGGED_OUT: "LOGGED_OUT",
  CLEAR_LOGIN_ERROR: "CLEAR_LOGIN_ERROR",
  USER_INFO_LOADED: "USER_INFO_LOADED",
  UPDATED_TEMP_PASSWORD: "UPDATED_TEMP_PASSWORD",
};

// action creators

export const loggedIn = (token) => ({
  type: STAFF_ACTION_TYPES.ADD_ITEM_TO_CART,
  payload: token,
});

const loginError = () => ({
  type: STAFF_ACTION_TYPES.LOGIN_ERROR,
});

export const userLoaded = (user) => ({
  type: STAFF_ACTION_TYPES.USER_INFO_LOADED,
  payload: user,
});

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
    const result = await staffService.login(email, password);
    if (result !== null && result.isAuth) {
      // login success
      dispatch(loggedIn(result.token));
      dispatch(userLoaded(result.user));
    } else {
      // login failed
      dispatch(loginError());
    }
  };
}

export function updateTempPassword(newPassword) {
  return async (dispatch, getState) => {
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
