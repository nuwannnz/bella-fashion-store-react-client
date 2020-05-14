const STAFF_INFO = "BELLA_ADMIN_TOKEN_KEY";
const CUSTOMER_TOKEN_KEY = "BELLA_CUSTOMER_TOKEN_KEY";

export const loadStaffInfoFromStorage = () => {
  return JSON.parse(localStorage.getItem(STAFF_INFO));
};

export const saveStaffInfoToStorage = (info) => {
  localStorage.setItem(STAFF_INFO, JSON.stringify(info));
};

export const deleteAdminTokenFromStorage = () => {
  localStorage.removeItem(STAFF_INFO);
};

export const loadCustomerTokenFromStorage = () => {
  return localStorage.getItem(CUSTOMER_TOKEN_KEY);
};

export const saveCustomerTokenToStorage = (token) => {
  localStorage.setItem(CUSTOMER_TOKEN_KEY, token);
};

export const deleteCustomerTokenFromStorage = () => {
  localStorage.removeItem(CUSTOMER_TOKEN_KEY);
};

export const getAuthHeader = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
