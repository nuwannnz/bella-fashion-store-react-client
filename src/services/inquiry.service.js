import axios from "axios";
import { API_HOST } from "../constants";
import { getAuthHeader } from "../helpers/token.helper";
import logger from "../helpers/logger.helper";
import { APIResult } from "./APIResult";

export const addInquiry = async (inquiryDto) => {
  const path = `${API_HOST}/inquiry`;
  const data = { inquiryDto };

  const result = new APIResult();

  try {
    const response = await axios.post(path, data);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const getAllInquiry = async (token) => {
  const path = `${API_HOST}/inquiry/`;
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

export const replyInquiry = async (token, replyDto) => {
  const path = `${API_HOST}/inquiry/reply`;
  const config = getAuthHeader(token);
  const data = { replyDto };
  const result = new APIResult();

  try {
    const response = await axios.post(path, data, config);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};
