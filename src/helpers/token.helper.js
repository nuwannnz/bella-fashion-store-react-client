const ADMIN_TOKEN_KEY = "BELLA_ADMIN_TOKEN_KEY";
const CUSTOMER_TOKEN_KEY = "BELLA_CUSTOMER_TOKEN_KEY";

export const loadAdminTokenFromStorage = () => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const saveAdminTokenToStorage = (token) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const loadCustomerTokenFromStorage = () => {
  return localStorage.getItem(CUSTOMER_TOKEN_KEY);
};

export const saveCustomerTokenToStorage = (token) => {
  localStorage.setItem(CUSTOMER_TOKEN_KEY, token);
};

export const getAuthHeader = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};