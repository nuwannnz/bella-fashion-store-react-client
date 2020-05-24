import { combineReducers } from "redux";
import { cart } from "./customer/cart.reducer";
import { staffLogin } from "./admin-panel/login/staff.reducer";
import { notification } from "./admin-panel/notification.reducer";
import { userDashboard } from "./admin-panel/user-dashboard";
import { product } from "./admin-panel/product.reducer";
import { product as customerProducts } from "./customer/product.reducer";
import { ui } from "./ui.reducer";
import { brand } from "./admin-panel/brand.reducer";
import { brand as customerBrands } from "./customer/brand.reducer";
import { customer } from "./customer/customer.reducer";

import { wishlist } from "./customer/wishlist.reducer";
import { category } from "./admin-panel/category.reducer"

import { size } from "./admin-panel/size.reducer"
import { size as customerSizes } from "./customer/size.reducer";

import { popup } from "./popup.reducer";
import { toast } from "./toast.reducer";
import { order } from "./customer/order.reducer";
import { order as adminOrder } from "./admin-panel/order.reducer";
import { category as customerCat } from "./customer/customer.category.reducer"
import { review } from "./customer/review.reducer"
import { homepage } from "./homepage.reducer";


export const customerReducer = combineReducers({
  customer,
  cart,
  ui,
  brand: customerBrands,
  size: customerSizes,
  brand,
  wishlist,
  product: customerProducts,
  popup,
  toast,
  order,
  category: customerCat,
  review,
  homepage

});

export const adminPanelReducer = combineReducers({
  staffLogin,
  notification,
  category,
  ui,
  userDashboard,
  product,
  brand,
  order: adminOrder,
  size,
  popup,
  toast,
  homepage

});

