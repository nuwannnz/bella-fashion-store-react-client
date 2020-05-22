import * as productService from "../../../services/admin/product.service";
import { MESSAGE_STRINGS } from "../../../resources/Strings";
import { ROUTE_PATHS } from "../../../constants";
import { saveAdminTokenToStorage, deleteAdminTokenFromStorage } from "../../../helpers/token.helper";
import ProductList from "../../../components/admin/ProductList";
import { displayToastAsync } from "../toast.actions";
import { buildNotification, NOTIFICATION_TYPE } from "../../../services/customer/notification.service";


export const PRODUCT_ACTION_TYPES = {
    
    PRODUCT_INFO_LOADED: "PRODUCT_INFO_LOADED",

    PRODUCT_ADDED: "PRODUCT_ADDED",
    PRODUCT_ADDED_SUCCESS_MSG:"PRODUCT_ADDED_SUCCESS_MSG",
    PRODUCT_ADDED_FAILURE_MSG:"PRODUCT_ADDED_FAILURE_MSG",
    CLEAR_PRODUCT_ADDED_SUCCESS_MSG:"CLEAR_PRODUCT_ADDED_SUCCESS_MSG",

    PRODUCT_DELETED: "PRODUCT_DELETED",

    PRODUCT_UPDATED: "PRODUCT_UPDATED",
    PRODUCT_UPDATED_SUCCESS_MSG:"PRODUCT_UPDATED_SUCCESS_MSG",
    PRODUCT_UPDATED_FAILURE_MSG:"PRODUCT_UPDATED_FAILURE_MSG",
    CLEAR_PRODUCT_UPDATED_SUCCESS_MSG:"CLEAR_PRODUCT_UPDATED_SUCCESS_MSG",

  PRODUCT_INFO_LOADED: "PRODUCT_INFO_LOADED",
  PRODUCT_LOADED_BY_ID: "PRODUCT_LOADED_BY_ID",
  PRODUCT_ADDED: "PRODUCT_ADDED",
  PRODUCT_DELETED: "PRODUCT_DELETED",

  PODUCT_LOADING: "PODUCT_LOADING"


};

export const productsLoading = (loading) => ({
  type: PRODUCT_ACTION_TYPES.PODUCT_LOADING,
  payload: loading
})

export const productsLoaded = (productList) => ({
  type: PRODUCT_ACTION_TYPES.PRODUCT_INFO_LOADED,
  payload: productList
})

export const productsAdded = (product) => ({
  type: PRODUCT_ACTION_TYPES.PRODUCT_ADDED,
  payload: product
})

export const productLoadedByID = (product) => ({
  type: PRODUCT_ACTION_TYPES.PRODUCT_LOADED_BY_ID,
  payload: product
})

export const productDeleted = (product) => ({
  type: PRODUCT_ACTION_TYPES.PRODUCT_DELETED,
  payload: product
})




  export const productsAddedSuccessMsg = (msg) => ({
    type:PRODUCT_ACTION_TYPES.PRODUCT_ADDED_SUCCESS_MSG,
    payload: msg
  })

  export const productsAddedFailMsg = (msg) => ({
    type:PRODUCT_ACTION_TYPES.PRODUCT_ADDED_FAILURE_MSG,
    payload: msg
  })

  export const clearProductsAddedSuccessMsg = () => ({
    type:PRODUCT_ACTION_TYPES.CLEAR_PRODUCT_ADDED_SUCCESS_MSG,
  })

  export const productsUpdated = (product) => ({
    type:PRODUCT_ACTION_TYPES.PRODUCT_UPDATED,
    payload: product
  })

  export const productsUpdatedSuccessMsg = (msg) => ({
    type:PRODUCT_ACTION_TYPES.PRODUCT_ADDED_SUCCESS_MSG,
    payload: msg
  })

  export const productsUpdatedFailMsg = (msg) => ({
    type:PRODUCT_ACTION_TYPES.PRODUCT_ADDED_FAILURE_MSG,
    payload: msg
  })

  export const clearProductsUpdatedSuccessMsg = () => ({
    type:PRODUCT_ACTION_TYPES.CLEAR_PRODUCT_ADDED_SUCCESS_MSG,
  })



  export function addProductAsync(
    productData
    ) {
      return async (dispatch, getState) => {
        dispatch(productsLoading(true))
        const { token } = getState().staffLogin.auth;
        const result = await productService.addProduct(
          token,
           productData);

           console.log(productData)


            if(result.isResultOk()) {
              dispatch(productsAddedSuccessMsg("Product is added successfully!!"))
              console.log("Product added successfull")
              dispatch(productsAdded(result.data.addedEntry))
              dispatch(productsLoading(false))
              dispatch(displayToastAsync(buildNotification("Product Added Successfully", NOTIFICATION_TYPE.SUCCESS)))
            } else {
              // display error notification
              dispatch(productsAddedSuccessMsg("Product is Failed to Add!!"))
              console.log("error");
              dispatch(displayToastAsync(buildNotification("Product is failed to Added", NOTIFICATION_TYPE.ERROR)))
              dispatch(productsLoading(false))
            }
           

            return;
          
      }

  }



  export function productsLoadedAsync() {
    return async (dispatch, getState)=> {
      dispatch(productsLoading(true))
      const result = await productService.getProducts();
      
        if(result.isResultOk) {
          console.log("product loaded")
          dispatch(productsLoaded(result.data));
          dispatch(productsLoading(false))
        } else {
          console.log("error in product loaded");
          dispatch(productsLoading(false))
        }
      }

  }




  export function productDeletedByIDAsync(id) {
    return async (dispatch, getState) => {
      dispatch(productsLoading(true))
      const { token } = getState().staffLogin.auth;
      const result = await productService.deleteProducts(token,id)

      if (result.isResultOk() && result.data.success) {
        
        dispatch(productDeleted(id))
        dispatch(productsLoading(false))
        dispatch(displayToastAsync(buildNotification("Product Deleted", NOTIFICATION_TYPE.SUCCESS)))
        
       return true
      } else {
        // display error notification
        console.log("error");
        dispatch(productsLoading(false))
        dispatch(displayToastAsync(buildNotification("Product is failed to delete", NOTIFICATION_TYPE.ERROR)))
        return false;
      }
    };
  }
  


  export function updateProductAsync( 
    _id,
    name,
    sizeQty,
    brand,
    category,
    subCategory,
    price,
    discount,
    colors,
    tags,
    description) {
    return async (dispatch, getState) => {
  
      console.log( _id,
        name,
        sizeQty,
        brand,
        category,
        subCategory,
        price,
        discount,
        colors,
        tags,
        description)
        dispatch(productsLoading(true))
      // get state from the state
      const { token } = getState().staffLogin.auth;
      // if (!token) {
      //   console.log('no token')
      //   return;
      // }
  
      const result = await productService.updateProduct(
        token,
        _id,
        name,
        sizeQty,
        brand,
        category,
        subCategory,
        price,
        discount,
        colors,
        tags,
        description);

      if (result.isResultOk()) {
        // fetch user again again
        // dispatch(loggedOut());
        console.log("Success");
         dispatch(productsUpdated(result.data));
         dispatch(productsUpdatedSuccessMsg("Product is Updated Successfully!!"));
         dispatch(productsLoading(false))
         dispatch(displayToastAsync(buildNotification("Product is updated Successfully", NOTIFICATION_TYPE.SUCCESS)))
        
      } else {
        // display error notification
        console.log("error");
        dispatch(productsUpdatedSuccessMsg("Product is failed to update!!"))
        dispatch(productsLoading(false))
        dispatch(displayToastAsync(buildNotification("Product is failed to update", NOTIFICATION_TYPE.ERROR)))
        return;
      }
    };
  }
  

