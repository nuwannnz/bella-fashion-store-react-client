import axios from "axios";
import { API_HOST } from "../../constants";
import { getAuthHeader, loadCustomerTokenFromStorage } from "../../helpers/token.helper";
import logger from "../../helpers/logger.helper";
import { APIResult } from "../APIResult";

export const login = async (email, password) => {
    const path = `${API_HOST}/customer/login`;
    const result = new APIResult();

    try {
        const response = await axios.post(path, {
            email,
            password
        });

        logger.info(`Received result => ${path}`, response);

        result.data = response.data;
        return result;
    } catch(error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const signUpCustomer = async ( fullName, email, password) => {
    const path = `${API_HOST}/customer/signup`;

    let arr = fullName.split(" ");
    let numOfNames = arr.length;
    let fName, lName, newArr;

    if(numOfNames === 2) {
        fName = arr[0];
        lName = arr[1];
    } else if(numOfNames === 1) {
        fName = arr[0];
        lName = "";
    } else {
        fName = arr[0];
        newArr = arr.slice(1);
        lName = newArr.join(" ");
    }

    const data = {
        fName,
        lName,
        email,
        password
    }

    const result = new APIResult();

    try {
        const response = await axios.post(path, data);
        result.data = response.data.success;
        return result;
    } catch(error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const getHasCustomer = async () => {
    const path = `${API_HOST}/customer/has`;

    try {
        const result = await axios.get(path);
        if(result.data.hasACustomer) {
            return true;
        }
        return false;
    } catch(error) {
        logger.error(`Error in API call => ${path}`);
        return false;
    }
};

export const verifyStoredToken = async () => {
    const storedToken = loadCustomerTokenFromStorage();
    if(storedToken == null) {
        return null;
    }

    const path = `${API_HOST}/customer`;
    const config = getAuthHeader(storedToken);

    try {
        const result = await axios.get(path, config);
        if(result.data) {
            return {
                token: storedToken,
                customerInfo: result.data.customer
            };
        }
        return null;
    } catch(error) {
        logger.error(`Error in API call => ${path}`);
        return null;
    }
};

export const addAddress = async (token, addressDto) => {
    const path = `${API_HOST}/customer/address`;
    const data = { addressDto };
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
/**
 * 
 * const a = {id: 1, name:'hkgjh'}
 * 
 * const b = {...a}
 * b = { id: 1, name:'hkgjh'}
 * 
 * 
 * const b = {a}
 * 
 * b{
 *   a:{id: 1, name:'hkgjh'}
 * }
 */
export const updateCustomerAddress = async (token, addressId, addressDto) => {
    const path = `${API_HOST}/customer/address/${addressId}`;
    const config = getAuthHeader(token);
    const data = { addressDto };
    const result = new APIResult();

    try {
        const response = await axios.put(path, data, config);

        result.data = response.data;
        return result;
    } catch(error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const deleteCustomerAddress = async (token, addressId) => {
    const path = `${API_HOST}/customer/address/${addressId}`;
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

export const updateCustomerInfo = async (token, customerInfoToUpdate) => {
    console.log("HI I'm front service");

    const path = `${API_HOST}/customer`;
    console.log("Hi, I'm path");
    console.log(path);

    const data = { customerInfoToUpdate };
    
    const config = getAuthHeader(token);
    console.log("Hi, I'm config");
    console.log(config);

    const result = new APIResult();
    console.log("Hi, I'm result");
    console.log(result);

    try {
        console.log("Hi, I'm data");
        console.log(data);
        const response = await axios.patch(path, data, config);
        console.log("Hi, I'm response");
        console.log(response);

        result.data = response.data;
        
        return result;
    } catch(error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const updateCustomerPassword = async (token, currentPwd, newPwd) => {
    const path = `${API_HOST}/customer/pwd`;
    const data = { currentPwd, newPwd };
    
    const config = getAuthHeader(token);

    const result = new APIResult();
    
    try {
        const response = await axios.patch(path, data, config);

        result.data = response.data;
        return result;
    } catch(error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};

export const addInquiry = async (token, inquiryDto) => {
    const path = `${API_HOST}/customer/inquiry`;
    const data = { inquiryDto };
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

export const getAllInquiry = async (token) => {
    const path = `${API_HOST}/customer/inquiry/`;
    const config = getAuthHeader(token);
    
    const result = new APIResult();

    try {
        const response = await axios.get(path, config);

        result.data = response.data;
        return result;
    } catch(error) {
        logger.error(`Error in API call => ${path}`);
        result.setError(error);
        return result;
    }
};