import axios from "axios";
import { API_HOST } from "../../constants";
import logger from "../../helpers/logger.helper";
import {
  getAuthHeader,
  loadAdminTokenFromStorage,
} from "../../helpers/token.helper";
import { APIResult } from "../APIResult";

export const addBrand = async (brand_name) => {
    const path = `${API_HOST}/brands`;
    const data = {brand_name}
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



  export const deleteBrand = async (id) => {
  
    const path = `${API_HOST}/brands/${id}`;

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
  