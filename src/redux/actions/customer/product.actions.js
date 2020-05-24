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
      
      const result = await productService.getProducts();
      
        if(result.isResultOk) {
          console.log("product loaded")
          dispatch(productsLoaded(result.data));
         
        } else {
          console.log("error in product loaded");
          
        }
      }

  }

