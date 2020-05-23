import * as brandService from "../../../services/admin/brand.service";

import { displayToastAsync } from "../toast.actions";
import { buildNotification, NOTIFICATION_TYPE } from "../../../services/customer/notification.service";


export const BRAND_ACTION_TYPES = {
    
  BRAND_INFO_LOADED: "BRAND_INFO_LOADED",
  BRAND_ADDED: "BRAND_ADDED",
  BRAND_DELETED: "BRAND_DELETED",

  BRAND_LOADING: "BRAND_LOADING"
    
  };
  export const brandsLoading = (loading) => ({
    type:BRAND_ACTION_TYPES.BRAND_LOADING,
    payload: loading
  })

  export const brandsLoaded = (brandList) => ({
    type:BRAND_ACTION_TYPES.BRAND_INFO_LOADED,
    payload: brandList
  })

  export const brandsAdded = (brand) => ({
    type:BRAND_ACTION_TYPES.BRAND_ADDED,
    payload: brand
  })

  export const brandsDeleted = (brandId) => ({
    type:BRAND_ACTION_TYPES.BRAND_DELETED,
    payload: brandId
  })



  export function addBrandAsync(brandData) {
      return async (dispatch, getState) => {
        dispatch(brandsLoading(true))
        const { token } = getState().staffLogin.auth;
        const result = await brandService.addBrand(token, brandData);

        console.log(result.data); 

        
        if(result.isResultOk() && result.data.succeded) {
          console.log("brand added successfull");
          dispatch(brandsAdded(result.data.addedEntry))
          dispatch(brandsLoading(false))
          dispatch(displayToastAsync(buildNotification("Brand Added Successfully", NOTIFICATION_TYPE.SUCCESS)))
        } else {
          // display error notification
          console.log("error");
          dispatch(brandsLoading(false))
          dispatch(displayToastAsync(buildNotification("Brand is add to delete", NOTIFICATION_TYPE.ERROR)))
          return;
        }
      }
  }

  export function brandsLoadedAsync() {
    return async (dispatch, getState)=> {
      dispatch(brandsLoading(true))
      const result = await brandService.getBrands();
      
      if(result.isResultOk) {
        console.log("brands loaded")
        dispatch(brandsLoaded(result.data));
        dispatch(brandsLoading(false))
      } else {
        console.log("error");
        dispatch(brandsLoading(false))
      }
    }
  }


  export function deleteBrandByID(id) {
    return async (dispatch, getState) => {
      dispatch(brandsLoading(true))
      const { token } = getState().staffLogin.auth;
      const result = await brandService.deleteBrands(token, id)

      if (result.isResultOk() && result.data.success) {
        console.log("Brand deleted");
        dispatch(brandsDeleted(id));
        dispatch(brandsLoading(false))
        dispatch(displayToastAsync(buildNotification("Brand deleted Successfully", NOTIFICATION_TYPE.SUCCESS)))

      } else { 
        console.log("error");
        dispatch(brandsLoading(false))
        dispatch(displayToastAsync(buildNotification("Brand is fail to delete", NOTIFICATION_TYPE.ERROR)))

        return;
      }
    };
  }
  

  

