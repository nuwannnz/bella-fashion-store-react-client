import * as brandService from "../../../services/admin/brand.service";



export const BRAND_ACTION_TYPES = {
    
  BRAND_INFO_LOADED: "BRAND_INFO_LOADED",
  BRAND_ADDED: "BRAND_ADDED",
  BRAND_CLEARED: "BRAND_CLEARED"
    
  };

  export const brandsLoaded = (brandList) => ({
    type:BRAND_ACTION_TYPES.BRAND_INFO_LOADED,
    payload: brandList
  })

  export const brandsAdded = (brand) => ({
    type:BRAND_ACTION_TYPES.BRAND_ADDED,
    payload: brand
  })

  export const brandsCleared = () => ({
    type:BRAND_ACTION_TYPES.BRAND_CLEARED
  })



  export function addBrandAsync(name) {
      return async (dispatch, getState) => {
        const result = await brandService.addBrand(name);

        console.log(result.data); 

        
        if(result.isResultOk() && result.data.succeded) {
          console.log("brand added successfull");
          dispatch(brandsAdded(result.data.addedEntry))
        } else {
          // display error notification
          console.log("error");
          return;
        }
      }
  }

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


  export function clearBrandsAsync() {
    return async (dispatch, getState) => {
      const result = await brandService.clearBrands()

      if (result.isResultOk() && result.data.succeded) {
        console.log("Brands cleared");
        // fetch user again again
        // dispatch(loggedOut());
        dispatch(brandsCleared());
      } else {
        // display error notification
        console.log("error");
        return;
      }
    };
  }
  

  

