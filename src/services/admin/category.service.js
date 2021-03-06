import axios from "axios";
import { API_HOST } from "../../constants";
import logger from "../../helpers/logger.helper";
import { APIResult } from "../APIResult";
import {
  getAuthHeader,
  
} from "../../helpers/token.helper";

export const getCategory = async () => {
  const path = `${API_HOST}/category/`;
  const result = new APIResult();

  try {
    const response = await axios.get(path);

    // logger.info(`Received result => ${path}`, response);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};


export const newCategory = async (categoryName) => {
  const path = `${API_HOST}/category`;
  const data = {categoryName}
  const result = new APIResult();
  try {
    const response = await axios.post(path, data);
    // logger.info(`Received result => ${path}`, response);

    result.data = response.data;
    return result;
  } catch (error) {

    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
}

export const newSubCategory = async (category,subcategory) => {
  const path = `${API_HOST}/category/subcategory`;
  const data = { category,subcategory}
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
}

export const updateCategory = async ( categoryId, updatedCategoryName) => {
  const path = `${API_HOST}/category`;
  const data = { categoryId,updatedCategoryName};

  const result = new APIResult();

  try {
    const response = await axios.put(path, data);
    result.data = response.data;
    return result;

  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const updateSubCategory = async ( id,sbid, newSubcategoryName) => {
  const path = `${API_HOST}/category/subcategory`;
  const data = { id,sbid, newSubcategoryName};

  const result = new APIResult();

  try {
    const response = await axios.put(path, data);
    result.data = response.data;
    return result;

  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const deleteCategory = async (categoryID) => {
  const path = `${API_HOST}/category/${categoryID}`;
  const data = {categoryID}
  const result = new APIResult();
  try {
    const response = await axios.delete(path, data);
    result.data = response.data;
    return result;
  } catch (error) {

    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
}

export const deleteSubCategory = async ( id,sbid ) => {
  const path = `${API_HOST}/category/${id}/${sbid}`;
  const data = {
    id,sbid
  }
  // const config = getAuthHeader()

  const result = new APIResult();
  try {
    const response = await axios.delete(path, data);
    result.data = response.data;
    return result;
  } catch (error) {

    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
}


