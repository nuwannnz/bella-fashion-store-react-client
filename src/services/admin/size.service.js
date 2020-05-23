import axios from "axios";
import { API_HOST } from "../../constants";
import logger from "../../helpers/logger.helper";
import {
  getAuthHeader,
  loadAdminTokenFromStorage,
} from "../../helpers/token.helper";
import { APIResult } from "../APIResult";

export const addSize = async (token, sizeData) => {
    const path = `${API_HOST}/sizes`;
    
    const data = {...sizeData }
    
    //console.log(sizeData.get("name"))

    const config = getAuthHeader(token)

    // config.headers['Content-Type'] = 'multipart/form-data'

    
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
  }

  export const getSizes = async () => {
    const path = `${API_HOST}/sizes`;

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



  export const deleteSizes = async (token,id) => {
  
    const config = getAuthHeader(token);
    const path = `${API_HOST}/sizes/${id}`;

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
  