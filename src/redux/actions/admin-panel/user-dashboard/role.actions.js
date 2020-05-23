import { getAllRoles } from "../../../../services/admin/staff.service";

export const ROLE_ACTION_TYPES = {
  GETALL_REQUEST: "ROLES_GETALL_REQUEST",
  GETALL_SUCCESS: "ROLES_GETALL_SUCCESS",
  GETALL_FAILURE: "ROLES_GETALL_FAILURE",

  ADD_REQUEST: "ROLES_GETALL_REQUEST",
  ADD_SUCCESS: "ROLES_GETALL_SUCCESS",
  ADD_FAILURE: "ROLES_GETALL_FAILURE",

  UPDATE_REQUEST: "ROLES_UPDATE_REQUEST",
  UPDATE_SUCCESS: "ROLES_UPDATE_SUCCESS",
  UPDATE_FAILURE: "ROLES_UPDATE_FAILURE",

  DELETE_REQUEST: "ROLES_GETALL_REQUEST",
  DELETE_SUCCESS: "ROLES_GETALL_SUCCESS",
  DELETE_FAILURE: "ROLES_GETALL_FAILURE",
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
