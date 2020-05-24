import * as brandService from "../../../services/admin/brand.service";

export const BRAND_ACTION_TYPES = {
    
  BRAND_INFO_LOADED: "BRAND_INFO_LOADED"

    
  };

  export const brandsLoaded = (brandList) => ({
    type:BRAND_ACTION_TYPES.BRAND_INFO_LOADED,
    payload: brandList
  })


  export function brandsLoadedAsync() {
    return async (dispatch, getState)=> {

      const result = await brandService.getBrands();
      
      if(result.isResultOk) {
        console.log("brands loaded")
        dispatch(brandsLoaded(result.data));
     
      } else {
        console.log("error");
   
      }
    }
  }

