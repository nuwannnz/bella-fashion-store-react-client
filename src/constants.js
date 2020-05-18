export const ROUTE_PATHS = {
  CUSTOMER_SHELL: "/",
  CUSTOMER_LOGIN: "/login",

  CUSTOMER_PRODUCT: "/product",
  CUSTOMER_PRODUCT_SINGLE: "/product/:id",
  CUSTOMER_ABOUTUS: "/aboutus",

  CUSTOMER_CATEGORIES: "/categories/category-name",
  CUSTOMER_CONTACT: "/contact",

  CUSTOMER_SIGNUP: "/signup",
  CUSTOMER_DASHBOARD: "/dashboard",
  CUSTOMER_DASHBOARD_ORDER: "/dashboard/order",
  CUSTOMER_DASHBOARD_ADDRESS: "/dashboard/address",
  CUSTOMER_DASHBOARD_ACCOUNT_INFO: "/dashboard/account-info",
  CUSTOMER_WISHLIST: "/wishlist",
  ADMIN_SHELL: "/admin",
  ADMIN_DASHBOARD: "/admin/",
  ADIMN_DASHBOARD_USER: '/admin/user',
  ADIMN_DASHBOARD_ORDER: '/admin/order',
  ADIMN_DASHBOARD_CATEGORY: '/admin/categories',
  ADIMN_DASHBOARD_PRODUCT: '/admin/product',
  ADIMN_DASHBOARD_CUSTOMER: '/admin/customer',
  ADIMN_DASHBOARD_INQUIRY: '/admin/inquiry',
  ADIMN_DASHBOARD_SALES: '/admin/sales',
  ADMIN_LOGIN: "/admin/login",
  ADMIN_SIGNUP: "/admin/signup",
  ADMIN_CATEGORY_ADD: "/admin/categories",
  ADMIN_UPDATE_TEMP_PWD: "/admin/update-pwd",
  ADMIN_UPDATE_TEMP_PWD: "/admin/update-pwd"

};

export const API_HOST = process.env.REACT_APP_API_URL;
