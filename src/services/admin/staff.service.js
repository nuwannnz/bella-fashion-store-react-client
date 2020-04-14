import axios from "axios";
import { API_HOST } from "../../Constants";
import logger from "../../helpers/logger.helper";
import {
  getAuthHeader,
  loadAdminTokenFromStorage,
} from "../../helpers/token.helper";

export const login = async (email, password) => {
  const path = `${API_HOST}/staff/login`;

  try {
    const result = await axios.post(path, {
      email,
      password,
    });

    logger.info(`Received result => ${path}`, result);

    return result.data;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    return null;
  }
};

export const updateTempPassword = async (token, updatedPassword) => {
  const path = `${API_HOST}/staff/pwd`;
  const data = { updatedPassword };
  const config = getAuthHeader(token);
  try {
    const result = await axios.post(path, data, config);

    return result.data;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    return null;
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
  const storedToken = loadAdminTokenFromStorage();
  if (storedToken === null) {
    return null;
  }

  const path = `${API_HOST}/staff/info`;
  try {
    const result = await axios.get(path, getAuthHeader(storedToken));
    if (result.data) {
      return {
        token: storedToken,
        userInfo: result.data,
      };
    }
    return null;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    return null;
  }
};
