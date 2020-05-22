import { API_HOST } from "../../constants";
import { getAuthHeader } from "../../helpers/token.helper";
import { APIResult } from "../APIResult";
import axios from "axios";
import logger from "../../helpers/logger.helper";

export const loadCart = async (token) => {
  const path = `${API_HOST}/carts/`;

  const config = getAuthHeader(token);

  const result = new APIResult();

  try {
    const response = await axios.get(path, config);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
};

export const addProductToCart = async (token, productId, size, qty) => {
  const path = `${API_HOST}/carts/products`;
  const data = { product_id: productId, size, qty };
  const config = getAuthHeader(token);

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
};

export const updateProductOfCart = async (token, productId, size, qty) => {
  const path = `${API_HOST}/carts/products/${productId}`;
  const data = { size, qty };
  const config = getAuthHeader(token);

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

export const removeProductFromCart = async (token, productId, size) => {
  const path = `${API_HOST}/carts/products/${productId}`;
  const data = { size };
  const config = getAuthHeader(token);

  //only for delte requests
  config.data = data;

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

export const clearCart = async (token) => {
  const path = `${API_HOST}/carts/products`;
  const config = getAuthHeader(token);

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

export const placeOrder = async (token, orderDto) => {
  const path = `${API_HOST}/orders`;
  const config = getAuthHeader(token);
  const data = { orderDto }

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


export const loadOrders = async (token) => {
  const path = `${API_HOST}/orders`;
  const config = getAuthHeader(token);

  const result = new APIResult();

  try {
    const response = await axios.get(path, config);

    result.data = response.data;
    return result;
  } catch (error) {
    logger.error(`Error in API call => ${path}`);
    result.setError(error);
    return result;
  }
}
