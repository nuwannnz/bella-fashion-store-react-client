import axios from "axios";
import { API_HOST } from "../../constants";
import logger from "../../helpers/logger.helper";
import {
  getAuthHeader,
  loadAdminTokenFromStorage,
} from "../../helpers/token.helper";
import { APIResult } from "../APIResult";

export const addProduct = async (
  productData
) => {
  const path = `${API_HOST}/products`;
  const result = new APIResult();
  try {
    const response = await axios.post(path, productData, { headers: { 'Content-Type': 'multipart/form-data' } });
    result.data = response.data.success;
    return result;
  } catch (error) {


    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
}

export const getProducts = async () => {
  let result = null;
  fetch(API_HOST + '/products').then(response => response.json())
    .then(json => {
      console.log(json)
      return json;
    })


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

  const path = `${API_HOST}/products`;
  const data = {
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
    description
  };
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
