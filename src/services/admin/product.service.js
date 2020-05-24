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
    formData) => {
      
      console.log(formData.get('_id'))
      console.log(formData.get('name'))
      console.log(formData.get('sizeQty'))
      console.log(formData.get('brand'))
      console.log(formData.get('category'))
      console.log(formData.get('subCategory'))
      console.log(formData.get('price'))
      console.log(formData.get('discount'))
      console.log(formData.get('colors'))
      console.log(formData.get('tags'))
      console.log(formData.get('description'))
      console.log(formData.get('images[]'))


    const config = getAuthHeader(token)
    const path = `${API_HOST}/products`;
    const data = {formData};
    //const config = getAuthHeader(token);
      console.log(data)
    const result = new APIResult();
    config.headers['Content-Type'] = 'multipart/form-data'
  
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
  

