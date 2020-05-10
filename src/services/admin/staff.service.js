import axios from "axios";
import { API_HOST } from "../../constants";
import logger from "../../helpers/logger.helper";
import {
  getAuthHeader,
  loadStaffInfoFromStorage,
} from "../../helpers/token.helper";
import { APIResult } from "../APIResult";

export const login = async (email, password) => {
  const path = `${API_HOST}/staff/login`;
  const result = new APIResult();

  try {
    const response = await axios.post(path, {
      email,
      password,
    });

    logger.info(`Received result => ${path}`, response);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const signUpAdmin = async (email, fName, lName) => {
  const path = `${API_HOST}/staff/admin/signup`;
  const data = {
    email,
    fName,
    lName,
  };
  const result = new APIResult();
  try {
    const response = await axios.post(path, data);
    result.data = response.data.success;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const updateTempPassword = async (token, updatedPassword) => {
  const path = `${API_HOST}/staff/pwd`;
  const data = { updatedPassword };
  const config = getAuthHeader(token);

  const result = new APIResult();

  try {
    const response = await axios.patch(path, data, config);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const getHasAdmin = async () => {
  const path = `${API_HOST}/staff/admin/has`;

  try {
    const result = await axios.get(path);
    if (result.data.hasAnAdmin) {
      return true;
    }
    return false;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    return false;
  }
};

export const verifyStoredToken = async () => {
  const userInfo = loadStaffInfoFromStorage();
  if (userInfo === null) {
    return null;
  }

  const path = `${API_HOST}/staff/${userInfo.userId}`;
  const config = getAuthHeader(userInfo.token);
  try {
    const result = await axios.get(path, config);
    if (result.data) {
      return {
        token: userInfo.token,
        userInfo: result.data.user,
      };
    }
    return null;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    return null;
  }
};

export const getAllUsers = async (token) => {
  const path = `${API_HOST}/staff/`;
  const config = getAuthHeader(token);

  const result = new APIResult();

  try {
    const response = await axios.get(path, config);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const getAllRoles = async (token) => {
  const path = `${API_HOST}/staff/role/`;
  const config = getAuthHeader(token);

  const result = new APIResult();

  try {
    const response = await axios.get(path, config);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const updateUser = async (token, userDto) => {
  const path = `${API_HOST}/staff/${userDto.id}`;
  const config = getAuthHeader(token);
  const data = { ...userDto };
  const result = new APIResult();

  try {
    const response = await axios.put(path, data, config);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const updateRole = async (token, roleDto) => {
  const path = `${API_HOST}/staff/role/${roleDto._id}`;
  const config = getAuthHeader(token);
  const data = { ...roleDto };
  const result = new APIResult();

  try {
    const response = await axios.put(path, data, config);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const deleteUser = async (token, userId) => {
  const path = `${API_HOST}/staff/${userId}`;
  const config = getAuthHeader(token);
  const result = new APIResult();

  try {
    const response = await axios.delete(path, config);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const deleteRole = async (token, roleId) => {
  const path = `${API_HOST}/staff/role/${roleId}`;
  const config = getAuthHeader(token);
  const result = new APIResult();

  try {
    const response = await axios.delete(path, config);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};
