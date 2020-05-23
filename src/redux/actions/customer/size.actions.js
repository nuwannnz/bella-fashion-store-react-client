import * as sizeService from "../../../services/admin/size.service";
import logger from "../../../helpers/logger.helper";


export const SIZE_ACTION_TYPES = {
    
  SIZE_INFO_LOADED: "SIZE_INFO_LOADED"
 
  };

  export const sizesLoaded = (sizeList) => ({
    type:SIZE_ACTION_TYPES.SIZE_INFO_LOADED,
    payload: sizeList
  })


  export function sizesLoadedAsync() {
    return async (dispatch, getState)=> {
     
      const result = await sizeService.getSizes();

      console.log(result.data)
      
      if(result.isResultOk) {
        logger.info("sizes loaded")
       
        
        dispatch(sizesLoaded(result.data));
      } else {
        logger.info("sizes api error")
      
      }
    }
  }

