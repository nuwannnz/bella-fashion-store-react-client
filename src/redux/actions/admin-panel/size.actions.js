import * as sizeService from "../../../services/admin/size.service";
import logger from "../../../helpers/logger.helper";



export const SIZE_ACTION_TYPES = {
    
  SIZE_INFO_LOADED: "SIZE_INFO_LOADED",
  SIZE_ADDED: "SIZE_ADDED",
  SIZE_DELETED: "SIZE_DELETED"
    
  };

  export const sizesLoaded = (sizeList) => ({
    type:SIZE_ACTION_TYPES.SIZE_INFO_LOADED,
    payload: sizeList
  })

  export const sizesAdded = (size) => ({
    type:SIZE_ACTION_TYPES.SIZE_ADDED,
    payload: size
  })

  export const sizesDeleted = (sizeId) => ({
    type:SIZE_ACTION_TYPES.SIZE_DELETED,
    payload: sizeId
  })



  export function addSizeAsync(sizeData) {
      return async (dispatch, getState) => {
        const { token } = getState().staffLogin.auth;
        const result = await sizeService.addSize(token, sizeData);
      
        logger.info(result)

        
        if(result.isResultOk() && result.data.succeded) {
          logger.info("size added successfully")
          dispatch(sizesAdded(result.data.addedEntry))
        } else {
          // display error notification
          logger.info("sizes api error")
          return;
        }
      }
  }

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


  export function deleteSizeByID(id) {
    return async (dispatch, getState) => {
      const { token } = getState().staffLogin.auth;
      const result = await sizeService.deleteSizes(token, id)

      if (result.isResultOk() && result.data.success) {
        logger.info("size deleted")
        dispatch(sizesDeleted(id));

      } else { 
        logger.info("sizes api error")

        return;
      }
    };
  }
  

  

