import { getAllRoles, addRole, updateRole, deleteRole } from "../../../../services/admin/staff.service";
import { displayToastAsync } from "../../toast.actions";
import { buildNotification, NOTIFICATION_TYPE } from "../../../../services/customer/notification.service";

export const ROLE_ACTION_TYPES = {
  GETALL_REQUEST: "ROLES_GETALL_REQUEST",
  GETALL_SUCCESS: "ROLES_GETALL_SUCCESS",
  GETALL_FAILURE: "ROLES_GETALL_FAILURE",

  ADD_REQUEST: "ROLES_ADD_REQUEST",
  ADD_SUCCESS: "ROLES_ADD_SUCCESS",
  ADD_FAILURE: "ROLES_ADD_FAILURE",

  UPDATE_REQUEST: "ROLES_UPDATE_REQUEST",
  UPDATE_SUCCESS: "ROLES_UPDATE_SUCCESS",
  UPDATE_FAILURE: "ROLES_UPDATE_FAILURE",

  DELETE_REQUEST: "ROLES_DELETE_REQUEST",
  DELETE_SUCCESS: "ROLES_DELETE_SUCCESS",
  DELETE_FAILURE: "ROLES_DELETE_FAILURE",
};

export function getAllRolesAsync() {
  return async (dispatch, getState) => {
    dispatch(request());
    const { token } = getState().staffLogin.auth;
    const result = await getAllRoles(token);

    if (result.isResultOk()) {
      dispatch(success(result.data));
    } else {
      dispatch(failiure(result.errorMessage));
    }
  };

  function request() {
    return { type: ROLE_ACTION_TYPES.GETALL_REQUEST };
  }
  function success(roles) {
    return { type: ROLE_ACTION_TYPES.GETALL_SUCCESS, payload: roles };
  }
  function failiure(errorMsg) {
    return { type: ROLE_ACTION_TYPES.GETALL_FAILURE, payload: errorMsg };
  }
}

export function createRoleAsync(role) {
  return async (dispatch, getState) => {
    dispatch(request());
    const { token } = getState().staffLogin.auth;
    const result = await addRole(token, role);

    if (result.isResultOk()) {
      dispatch(success(result.data));
      dispatch(displayToastAsync(buildNotification("Created role successfully", NOTIFICATION_TYPE.SUCCESS)))
      return true;
    } else {
      dispatch(failiure(result.errorMessage));
      dispatch(displayToastAsync(buildNotification("Failed to create role", NOTIFICATION_TYPE.ERROR)))
      return false;
    }
  };

  function request() {
    return { type: ROLE_ACTION_TYPES.ADD_REQUEST };
  }
  function success(roles) {
    return { type: ROLE_ACTION_TYPES.ADD_SUCCESS, payload: roles };
  }
  function failiure(errorMsg) {
    return { type: ROLE_ACTION_TYPES.ADD_FAILURE, payload: errorMsg };
  }
}

export function updateRoleAsync(roleId, role) {
  return async (dispatch, getState) => {
    dispatch(request());
    const { token } = getState().staffLogin.auth;
    const result = await updateRole(token, roleId, role);

    if (result.isResultOk()) {
      dispatch(success(result.data));
      dispatch(displayToastAsync(buildNotification("Updated role successfully", NOTIFICATION_TYPE.SUCCESS)))
      return true;
    } else {
      dispatch(failiure({ id: roleId, error: result.errorMessage }));
      dispatch(displayToastAsync(buildNotification("Failed to update role", NOTIFICATION_TYPE.ERROR)))
      return false;
    }
  };

  function request() {
    return { type: ROLE_ACTION_TYPES.UPDATE_REQUEST };
  }
  function success(roles) {
    return { type: ROLE_ACTION_TYPES.UPDATE_SUCCESS, payload: roles };
  }
  function failiure(errorMsg) {
    return { type: ROLE_ACTION_TYPES.UPDATE_FAILURE, payload: errorMsg };
  }
}

export function deleteRoleAsync(roleId) {
  return async (dispatch, getState) => {
    dispatch(request());
    const { token } = getState().staffLogin.auth;
    const result = await deleteRole(token, roleId);

    if (result.isResultOk()) {
      dispatch(success(roleId));
      dispatch(displayToastAsync(buildNotification("Deleted role successfully", NOTIFICATION_TYPE.SUCCESS)))
      return true;
    } else {
      dispatch(failiure(result.errorMessage));
      dispatch(displayToastAsync(buildNotification("Failed to delete role", NOTIFICATION_TYPE.ERROR)))
      return false;
    }
  };

  function request() {
    return { type: ROLE_ACTION_TYPES.DELETE_REQUEST };
  }
  function success(roles) {
    return { type: ROLE_ACTION_TYPES.DELETE_SUCCESS, payload: roles };
  }
  function failiure(errorMsg) {
    return { type: ROLE_ACTION_TYPES.DELETE_FAILURE, payload: errorMsg };
  }
}
