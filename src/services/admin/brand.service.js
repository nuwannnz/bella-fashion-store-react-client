import axios from "axios";
import { API_HOST } from "../../constants";
import logger from "../../helpers/logger.helper";
import {
  getAuthHeader,
  loadAdminTokenFromStorage,
} from "../../helpers/token.helper";
import { APIResult } from "../APIResult";

export const addBrand = async (token, brandData) => {
    const path = `${API_HOST}/brands`;
    const data = {brandData}

    console.log(brandData)

    const config = getAuthHeader(token)
    config.headers['Content-Type'] = 'multipart/form-data'
    
    const result = new APIResult();
    try {
      const response = await axios.post(path, brandData, config);
      result.data = response.data;
      return result;
    } catch (error) {
  
  
      logger.error(`Error in API call => ${path}`);
      result.setError(error);
      return result;
    }
  }

  export const getBrands = async () => {
    const path = `${API_HOST}/brands`;

    const result = new APIResult();

    try {
      const response = await axios.get(path);
      result.data = response.data;
      return result;
    } catch (error) {
      logger.error(`Error in API call => ${path}`);
      result.setError(error);
      return result;
    }

    
  };



  export const deleteBrands = async (token,id) => {
  
    const config = getAuthHeader(token);
    const path = `${API_HOST}/brands/${id}`;

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
  