
import { API_HOST } from "../constants";
import { getAuthHeader } from "../helpers/token.helper";
import { APIResult } from "./APIResult";
import axios from "axios";
import logger from "../helpers/logger.helper";

export const loadBanners = async () => {
    const path = `${API_HOST}/homepage/banners`;


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

export const loadCategoryBanners = async () => {
    const path = `${API_HOST}/homepage/category-banners`;


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

export const createBanner = async (token, bannerDto) => {
    const path = `${API_HOST}/homepage/banners`;

    const config = getAuthHeader(token);
    config.headers['Content-Type'] = 'multipart/form-data'


    const result = new APIResult();

    try {
        const response = await axios.post(path, bannerDto, config);

        result.data = response.data;
        return result;
    } catch (error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const createCategoryBanner = async (token, bannerDto) => {
    const path = `${API_HOST}/homepage/category-banners`;

    const config = getAuthHeader(token);
    config.headers['Content-Type'] = 'multipart/form-data'


    const result = new APIResult();

    try {
        const response = await axios.post(path, bannerDto, config);

        result.data = response.data;
        return result;
    } catch (error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const deleteBanner = async (token, bannerId) => {
    const path = `${API_HOST}/homepage/banners/${bannerId}`;

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

export const deleteCategoryBanner = async (token, bannerId) => {
    const path = `${API_HOST}/homepage/category-banners/${bannerId}`;

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