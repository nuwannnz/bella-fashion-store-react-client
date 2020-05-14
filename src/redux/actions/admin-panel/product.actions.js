import * as productService from "../../../services/admin/product.service";
import { MESSAGE_STRINGS } from "../../../resources/Strings";
import { ROUTE_PATHS } from "../../../constants";
import { saveAdminTokenToStorage, deleteAdminTokenFromStorage } from "../../../helpers/token.helper";
import ProductList from "../../../components/admin/ProductList";


export const PRODUCT_ACTION_TYPES = {
    
    PRODUCT_INFO_LOADED: "PRODUCT_INFO_LOADED",
    PRODUCT_LOADED_BY_ID: "PRODUCT_LOADED_BY_ID",
    PRODUCT_ADDED: "PRODUCT_ADDED",
    PRODUCT_DELETED: "PRODUCT_DELETED"

    
  };

  export const productsLoaded = (productList) => ({
    type:PRODUCT_ACTION_TYPES.PRODUCT_INFO_LOADED,
    payload: productList
  })

  export const productsAdded = (product) => ({
    type:PRODUCT_ACTION_TYPES.PRODUCT_ADDED,
    payload: product
  })

  export const productLoadedByID = (product) => ({
    type:PRODUCT_ACTION_TYPES.PRODUCT_LOADED_BY_ID,
    payload: product
  })

  export const productDeleted = (product) => ({
    type:PRODUCT_ACTION_TYPES.PRODUCT_DELETED,
    payload: product
  })

  export function addProductAsync(
    name,
    sizeQty,
    brand,
    category,
    subCategory,
    price,
    discount,
    colors,
    tags,
    description
    ) {
      return async (dispatch, getState) => {
        const result = await productService.addProduct(
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

            if(result.isResultOk() && result.data.success) {
              dispatch(productsAdded(result.data))
            } else {
              // display error notification
              console.log("error");
              return;
            }
          
      }
  }

  export function productsLoadedAsync() {
    return async (dispatch, getState)=> {
      fetch('http://localhost:4200/api/v1/products').then(response => response.json())
      .then(json => {
        dispatch(productsLoaded(json))
         return json;
      })

      }
  }

  export function productLoadedByIDAsync(id) {
    return async (dispatch, getState)=> {
      fetch('http://localhost:5000/api/v1/products/'+id).then(response => response.json())
      .then(json => {
          dispatch(productLoadedByID(json));
          
      })
      // const result = await productService.getProductById(id);
      // dispatch(productLoadedByID(result));
      // console.log(result)
    }
  }

  export function productDeletedByIDAsync(id) {
    return async (dispatch, getState) => {
      const result = await productService.deleteProducts(id)

      if (result.isResultOk() && result.data.success) {
        // fetch user again again
        // dispatch(loggedOut());
        // dispatch(updatedTempPassword());
        console.log(result);
      } else {
        // display error notification
        console.log("error");
        return;
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
  
      // get state from the state
      const { token } = getState().staffLogin.auth;
      // if (!token) {
      //   console.log('no token')
      //   return;
      // }
  
      const result = await productService.updateProduct(
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

      if (result.isResultOk() && result.data.success) {
        // fetch user again again
        // dispatch(loggedOut());
        // dispatch(updatedTempPassword());
        console.log(result);
      } else {
        // display error notification
        console.log("error");
        return;
      }
    };
  }
  

