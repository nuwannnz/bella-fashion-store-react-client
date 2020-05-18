import * as brandService from "../../../services/admin/brand.service";



export const BRAND_ACTION_TYPES = {
    
  BRAND_INFO_LOADED: "BRAND_INFO_LOADED",
  BRAND_ADDED: "BRAND_ADDED",
  BRAND_DELETED: "BRAND_DELETED"
    
  };

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
        const { token } = getState().staffLogin.auth;
        const result = await brandService.addBrand(token, brandData);

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


  export function deleteBrandByID(id) {
    return async (dispatch, getState) => {
      const { token } = getState().staffLogin.auth;
      const result = await brandService.deleteBrands(token, id)

      if (result.isResultOk() && result.data.success) {
        console.log("Brand deleted");
        dispatch(brandsDeleted(id));

      } else { 
        console.log("error");

        return;
      }
    };
  }
  

  

