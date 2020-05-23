import { API_HOST } from "../../constants";
import { getAuthHeader } from "../../helpers/token.helper";
import { APIResult } from "../APIResult";
import Axios from "axios";
import logger from "../../helpers/logger.helper";


export const getAllOrders = async (token) => {
    const path = `${API_HOST}/orders`;
    const config = getAuthHeader(token);

    const result = new APIResult();

    try {
        const response = await Axios.get(path, config);

        result.data = response.data;
        return result;
    } catch (error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const deleteOrder = async (token, orderId) => {
    const path = `${API_HOST}/orders/${orderId}`;
    const config = getAuthHeader(token);
    const result = new APIResult();

    try {
        const response = await Axios.delete(path, config);

        result.data = response.data;
        return result;
    } catch (error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};


export const updateOrderStatus = async (token, orderId, orderStatus) => {
    const path = `${API_HOST}/orders/${orderId}`;
    const config = getAuthHeader(token);
    const data = { orderStatus };
    const result = new APIResult();

    try {
        const response = await Axios.patch(path, data, config);

        result.data = response.data;
        return result;
    } catch (error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};
