import axios from "axios";
import { API_HOST } from "../../Constants";
import logger from "../../helpers/logger.helper";
import {
  getAuthHeader,
  loadAdminTokenFromStorage,
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
    lName
  }
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
}

export const updateTempPassword = async (token, updatedPassword) => {
  const path = `${API_HOST}/staff/pwd`;
  const data = { updatedPassword };
  const config = getAuthHeader(token);

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

  const path = `${API_HOST}/staff`;
  const config = getAuthHeader(storedToken);
  try {
    const result = await axios.get(path, config);
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
