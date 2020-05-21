import axios from "axios";
import { API_HOST } from "../../constants";
import logger from "../../helpers/logger.helper";
import {
  getAuthHeader,
  loadAdminTokenFromStorage,
} from "../../helpers/token.helper";
import { APIResult } from "../APIResult";


//add products
export const addProduct = async (    
  token,
  productData
    ) => {
    const path = `${API_HOST}/products`;
   
    const config = getAuthHeader(token)
    config.headers['Content-Type'] = 'multipart/form-data'

    const result = new APIResult();
    try {
      const response = await axios.post(path, productData, config);
      result.data = response.data;
      return result;
    } catch (error) {
  
  
      logger.error(`Error in API call => ${path}`);
      result.setError(error);
      return result;
    }
  }
//get all products
  export const getProducts = async () => {
    const path = `${API_HOST}/products`;

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

  //update products
  export const updateProduct = async ( 
    token,
    _id,
    name,
    sizeQty,
    brand,
    category,
    subCategory,
    price,
    discount,
    colors,
    tags,
    description) => {
      
      console.log(_id,
        name,
        sizeQty,
        brand,
        category,
        subCategory,
        price,
        discount,
        colors,
        tags,
        description)

    const config = getAuthHeader(token)
    const path = `${API_HOST}/products`;
    const data = { _id,
      name,
      sizeQty,
      brand,
      category,
      subCategory,
      price,
      discount,
      colors,
      tags,
      description };
    //const config = getAuthHeader(token);
      console.log(data)
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
 
  //delete products
  export const deleteProducts = async (token, id) => {
  
    const config = getAuthHeader(token)
    const path = `${API_HOST}/products/${id}`;

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
  

