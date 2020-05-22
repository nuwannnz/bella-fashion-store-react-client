import { API_HOST } from "../../constants";
import { getAuthHeader } from "../../helpers/token.helper";
import { APIResult } from "../APIResult";
import axios from "axios";
import logger from "../../helpers/logger.helper";

export const loadWishlist = async (token) => {
    const path = `${API_HOST}/wishlists/`;

    const config = getAuthHeader(token);

    const result = new APIResult();

    try {
        const response = await axios.get(path, config);

        result.data = response.data;

        result.data = response.data;

        return result;
    } catch(error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const addProductToWishlist = async (token, productId, qty) => {
    const path = `${API_HOST}/wishlists/products`;
    const data = { product_id: productId, qty };
    const config = getAuthHeader(token);

    const result = new APIResult();

    try {
        const response = await axios.post(path, data, config);

        result.data = response.data;
        return result;
    } catch(error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const removeProductFromWishlist = async (token, productId) => {
    const path = `${API_HOST}/wishlists/products/${productId}`;
    const data = {};
    const config = getAuthHeader(token);

    config.data = data;

    const result = new APIResult();

    try {
        const response = await axios.delete(path, config);

        result.data = response.data;
        return result;
    } catch(error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const clearWishlist = async (token) => {
    const path = `${API_HOST}/wishlists/products`;
    const config = getAuthHeader(token);

    const result = new APIResult();

    try {
        const response = await axios.delete(path, config);

        result.data = response.data;
        return result;
    } catch(error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};