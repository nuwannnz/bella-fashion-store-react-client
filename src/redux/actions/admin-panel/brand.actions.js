import * as brandService from "../../../services/admin/brand.service";



export const BRAND_ACTION_TYPES = {
    
  BRAND_INFO_LOADED: "BRAND_INFO_LOADED",
  BRAND_ADDED: "BRAND_ADDED",
    
  };

  export const brandsLoaded = (brandList) => ({
    type:BRAND_ACTION_TYPES.BRAND_INFO_LOADED,
    payload: brandList
  })

  export const brandsAdded = (brand) => ({
    type:BRAND_ACTION_TYPES.BRAND_ADDED,
    payload: brand
  })



  export function addBrandAsync(name) {
      return async (dispatch, getState) => {
        const result = await brandService.addBrand(name);

        
        if(result.isResultOk() && result.data.success) {
          dispatch(brandsAdded(result.data))
        } else {
          // display error notification
          console.log("error");
          return;
        }
      }
  }

  export function brandsLoadedAsync() {
    return(dispatch, getState)=> {
      fetch('http://localhost:5000/api/v1/brands').then(response => response.json())
      .then(json => {
          dispatch(brandsLoaded(json));
          console.log(json)
      })
    }
  }


  export function brandDeletedByIDAsync(id) {
    return async (dispatch, getState) => {
      const result = await brandService.deleteBrand(id)

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
  

  

