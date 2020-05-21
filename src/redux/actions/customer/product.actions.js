import * as productService from "../../../services/admin/product.service";

export const PRODUCT_ACTION_TYPES = {
    
    PRODUCT_INFO_LOADED: "PRODUCT_INFO_LOADED",
    PRODUCT_LOADED_BY_ID: "PRODUCT_LOADED_BY_ID",

    
  };

  
  export const productsLoaded = (productList) => ({
    type:PRODUCT_ACTION_TYPES.PRODUCT_INFO_LOADED,
    payload: productList
  })

  export function productsLoadedAsync() {
    return async (dispatch, getState)=> {
      fetch('http://localhost:5000/api/v1/products').then(response => response.json())
      .then(json => {
        dispatch(productsLoaded(json))
         return json;
      })

      }
  }

