import { API_HOST } from "../../constants";
import { getAuthHeader } from "../../helpers/token.helper";
import { APIResult } from "../APIResult";
import Axios from "axios";
import logger from "../../helpers/logger.helper";


export const getReviewsOfProduct = async (productId) => {
    const path = `${API_HOST}/reviews/${productId}`;

    const result = new APIResult();

    try {
        const response = await Axios.get(path);

        result.data = response.data;
        return result;
    } catch (error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const addProductReview = async (token, reviewDto) => {
    const path = `${API_HOST}/reviews/`;
    const data = { reviewDto };
    const result = new APIResult();
    const config = getAuthHeader(token);

    try {
        const response = await Axios.post(path, data, config);

        result.data = response.data;
        return result;
    } catch (error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};


export const upVoteProductReview = async (token, reviewId) => {
    const path = `${API_HOST}/reviews/${reviewId}/upvote`;
    const result = new APIResult();
    const config = getAuthHeader(token);

    try {
        const response = await Axios.patch(path, {}, config);

        result.data = response.data;
        return result;
    } catch (error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};


export const downVoteProductReview = async (token, reviewId) => {
    const path = `${API_HOST}/reviews/${reviewId}/downvote`;
    const result = new APIResult();
    const config = getAuthHeader(token);

    try {
        const response = await Axios.patch(path, {}, config);

        result.data = response.data;
        return result;
    } catch (error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const deleteProductReview = async (token, reviewId) => {
    const path = `${API_HOST}/reviews/${reviewId}`;
    const result = new APIResult();
    const config = getAuthHeader(token);

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

