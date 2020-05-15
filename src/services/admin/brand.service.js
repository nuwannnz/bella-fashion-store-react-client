import axios from "axios";
import { API_HOST } from "../../constants";
import logger from "../../helpers/logger.helper";
import {
  getAuthHeader,
  loadAdminTokenFromStorage,
} from "../../helpers/token.helper";
import { APIResult } from "../APIResult";

export const addBrand = async (name) => {
    const path = `${API_HOST}/brands`;
    const data = {name}
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



  export const clearBrands = async () => {
  
    const path = `${API_HOST}/brands`;

    const result = new APIResult();
  
    try {
      const response = await axios.delete(path);
  
      result.data = response.data;
      return result;
  
    } catch (error) {
      logger.error(`Error in API call => ${path}`);
      result.setError(error);
      return result;
    }
  };
  