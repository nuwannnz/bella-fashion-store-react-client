import axios from "axios";
import { API_HOST } from "../../Constants";
import logger from "../../helpers/logger.helper";
import { APIResult } from "../APIResult";
import {
  getAuthHeader,
  loadAdminTokenFromStorage,
} from "../../helpers/token.helper";

export const Categories = async (categoryID, categoryName) => {
  const path = `${API_HOST}/staff/categories`;
  const result = new APIResult();

  try {
    const response = await axios.post(path, {
      categoryID,
      categoryName,
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


export const newCategory = async (categoryName) => {
  const path = `${API_HOST}/staff/categories`;
  const data = {
    categoryName
  }
  const config = verifyStoredToken();
  const result = new APIResult();
  try {
    const response = await axios.post(path, data, config);
    result.data = response.data.success;
    return result;
  } catch (error) {

    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
}

export const updateCategory = async (token, categoryId, updatedCategoryName) => {
  const path = `${API_HOST}/category/${categoryId}`;
  const data = { updatedCategoryName };
  const config = getAuthHeader();

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