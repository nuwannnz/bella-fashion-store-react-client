import {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../../../../services/admin/staff.service";
import { displayToastAsync } from "../../toast.actions";
import { buildNotification, NOTIFICATION_TYPE } from "../../../../services/customer/notification.service";

export const USER_DASHBOAR_ACTION_TYPES = {
  GETALL_REQUEST: "USERS_GETALL_REQUEST",
  GETALL_SUCCESS: "USERS_GETALL_SUCCESS",
  GETALL_FAILURE: "USERS_GETALL_FAILURE",

  ADD_REQUEST: "USERS_ADD_REQUEST",
  ADD_SUCCESS: "USERS_ADD_SUCCESS",
  ADD_FAILURE: "USERS_ADD_FAILURE",

  DELETE_REQUEST: "USERS_DELETE_REQUEST",
  DELETE_SUCCESS: "USERS_DELETE_SUCCESS",
  DELETE_FAILURE: "USERS_DELETE_FAILURE",

  UPDATE_REQUEST: "USERS_UPDATE_REQUEST",
  UPDATE_SUCCESS: "USERS_UPDATE_SUCCESS",
  UPDATE_FAILURE: "USERS_UPDATE_FAILURE",
};

export function getAllUsersAsync() {
  return async (dispatch, getState) => {
    dispatch(request());
    const { token } = getState().staffLogin.auth;

    const result = await getAllUsers(token);

    if (result.isResultOk()) {
      dispatch(success(result.data));
    } else {
      failiure(result.errorMessage);
    }
  };

  function request() {
    return { type: USER_DASHBOAR_ACTION_TYPES.GETALL_REQUEST };
  }
  function success(users) {
    return { type: USER_DASHBOAR_ACTION_TYPES.GETALL_SUCCESS, payload: users };
  }
  function failiure(errorMsg) {
    return {
      type: USER_DASHBOAR_ACTION_TYPES.GETALL_FAILURE,
      payload: errorMsg,
    };
  }
}

export function addUserAsync(userDto) {
  return async (dispatch, getState) => {
    dispatch(request());
    const { token } = getState().staffLogin.auth;

    const result = await addUser(token, userDto);

    if (result.isResultOk()) {
      dispatch(success(result.data));
      return true
    } else {
      dispatch(failiure(result.errorMessage));
      return false
    }
  };

  function request() {
    return { type: USER_DASHBOAR_ACTION_TYPES.ADD_REQUEST };
  }
  function success(payload) {
    return { type: USER_DASHBOAR_ACTION_TYPES.ADD_SUCCESS, payload };
  }
  function failiure(errorMsg) {
    return {
      type: USER_DASHBOAR_ACTION_TYPES.ADD_FAILURE,
      payload: errorMsg,
    };
  }
}

export function deleteUserAsync(userId) {
  return async (dispatch, getState) => {
    dispatch(request({ id: userId }));
    const { token } = getState().staffLogin.auth;

    const result = await deleteUser(token, userId);

    if (result.isResultOk()) {
      dispatch(success({ id: userId }));
    } else {
      dispatch(failiure(result.errorMessage));
    }
  };

  function request(payload) {
    return { type: USER_DASHBOAR_ACTION_TYPES.DELETE_REQUEST, payload };
  }
  function success(payload) {
    return { type: USER_DASHBOAR_ACTION_TYPES.DELETE_SUCCESS, payload };
  }
  function failiure(errorMsg) {
    return {
      type: USER_DASHBOAR_ACTION_TYPES.DELETE_FAILURE,
      payload: errorMsg,
    };
  }
}

export function updateUserAsync(userId, userDto) {
  return async (dispatch, getState) => {
    dispatch(request());
    const { token } = getState().staffLogin.auth;

    const result = await updateUser(token, userId, userDto);

    if (result.isResultOk()) {
      dispatch(success(result.data));
      dispatch(displayToastAsync(buildNotification("Updated user successfully", NOTIFICATION_TYPE.SUCCESS)))
      return true;
    } else {
      dispatch(failiure(result.errorMessage));
      return false;
    }
  };

  function request() {
    return { type: USER_DASHBOAR_ACTION_TYPES.UPDATE_REQUEST };
  }
  function success(payload) {
    return { type: USER_DASHBOAR_ACTION_TYPES.UPDATE_SUCCESS, payload };
  }
  function failiure(errorMsg) {
    return {
      type: USER_DASHBOAR_ACTION_TYPES.UPDATE_FAILURE,
      payload: errorMsg,
    };
  }
}
