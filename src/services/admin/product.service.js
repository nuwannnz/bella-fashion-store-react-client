import axios from "axios";
import { API_HOST } from "../../Constants";
import logger from "../../helpers/logger.helper";
import {
  getAuthHeader,
  loadAdminTokenFromStorage,
} from "../../helpers/token.helper";
import { APIResult } from "../APIResult";

export const addProduct = async (    
    product_name,
    product_size_qty,
    product_brand,
    product_category,
    product_sub_category,
    product_price,
    product_discount,
    product_colors,
    product_tags,
    product_description
    ) => {
    const path = `${API_HOST}/products`;
    const data = {
        product_name,
        product_size_qty,
        product_brand,
        product_category,
        product_sub_category,
        product_price,
        product_discount,
        product_colors,
        product_tags,
        product_description
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

  export const getProductById = async (id) => {
  
    const path = `${API_HOST}/products/${id}`;

    try {
      const result = fetch(path).then(response => response.json())
      .then(json => {
         return json
          
      })
      if (result.data) {
        return result.data;
      }
      return null;
    } catch (error) {
      logger.error(`Error in API call => ${path}`);
      return null;
    }
  };
  

  export const updateProduct = async ( 
    _id,
    product_name,
    product_size_qty,
    product_brand,
    product_category,
    product_sub_category,
    product_price,
    product_discount,
    product_colors,
    product_tags,
    product_description) => {
      
      console.log(_id,
        product_name,
        product_size_qty,
        product_brand,
        product_category,
        product_sub_category,
        product_price,
        product_discount,
        product_colors,
        product_tags,
        product_description)

    const path = `${API_HOST}/products`;
    const data = { _id,
      product_name,
      product_size_qty,
      product_brand,
      product_category,
      product_sub_category,
      product_price,
      product_discount,
      product_colors,
      product_tags,
      product_description };
    //const config = getAuthHeader(token);
      console.log(data)
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

  export const deleteProducts = async (id) => {
  
    const path = `${API_HOST}/products/${id}`;

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
  