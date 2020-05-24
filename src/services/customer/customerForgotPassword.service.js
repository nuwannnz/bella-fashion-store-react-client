import axios from "axios";
import { API_HOST } from "../../constants";
import logger from "../../helpers/logger.helper";
import { APIResult } from "../APIResult";

export const checkEmail = async (email) => {
  const path = `${API_HOST}/forgot-pwd/step-1`;
  const result = new APIResult();

  try {
    const response = await axios.post(path, { email });

    logger.info(`Received result => ${path}`, response);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const checkCode = async (email, code) => {
  const path = `${API_HOST}/forgot-pwd/step-2`;
  const result = new APIResult();

  try {
    const response = await axios.post(path, { email, code });

    logger.info(`Received result => ${path}`, response);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const checkPassword = async (email, newPwd) => {
  const path = `${API_HOST}/forgot-pwd/step-3`;
  const result = new APIResult();

  try {
    const response = await axios.post(path, { email, newPwd });

    logger.info(`Received result => ${path}`, response);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};
