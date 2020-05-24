import axios from "axios";
import { API_HOST } from "../../constants";
import logger from "../../helpers/logger.helper";
import { APIResult } from "../APIResult";

export const getCategory = async () => {
    const path = `${API_HOST}/category/`;
    const result = new APIResult();
  
    try {
      const response = await axios.get(path);
  
      logger.info(`Received result => ${path}`, response);
  
      result.data = response.data;
      return result;
    } catch (error) {
      logger.error(`Error in API call => ${path}`);
      result.setError(error);
      return result;
    }
  };
  