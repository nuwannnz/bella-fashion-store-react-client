import * as sizeService from "../../../services/admin/size.service";
import logger from "../../../helpers/logger.helper";


import { displayToastAsync } from "../toast.actions";
import { buildNotification, NOTIFICATION_TYPE } from "../../../services/customer/notification.service";


export const SIZE_ACTION_TYPES = {
    
  SIZE_INFO_LOADED: "SIZE_INFO_LOADED",
  SIZE_ADDED: "SIZE_ADDED",
  SIZE_DELETED: "SIZE_DELETED",

  SIZE_LOADING: "SIZE_LOADING"
    
  };

  export const sizesLoading = (loading) => ({
    type:SIZE_ACTION_TYPES.SIZE_LOADING,
    payload: loading
  })

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
        dispatch(sizesLoading(true))
        const { token } = getState().staffLogin.auth;
        const result = await sizeService.addSize(token, sizeData);
      
        logger.info(result)

        
        if(result.isResultOk() && result.data.succeded) {
          logger.info("size added successfully")
          dispatch(sizesAdded(result.data.addedEntry))
          dispatch(sizesLoading(false))
          dispatch(displayToastAsync(buildNotification("Size Added Successfully", NOTIFICATION_TYPE.SUCCESS)))
          return true;
        } else {
  
          // display error notification
          logger.info("sizes api error")
          dispatch(sizesLoading(false))
          dispatch(displayToastAsync(buildNotification("Size is fail to added", NOTIFICATION_TYPE.ERROR)))
          return false;
        }
      }
  }

  export function sizesLoadedAsync() {
    return async (dispatch, getState)=> {
      dispatch(sizesLoading(true))
      const result = await sizeService.getSizes();

      console.log(result.data)
      
      if(result.isResultOk) {
        logger.info("sizes loaded")
        dispatch(sizesLoading(false))
        
        dispatch(sizesLoaded(result.data));
      } else {
        logger.info("sizes api error")
        dispatch(sizesLoading(false))
      }
    }
  }


  export function deleteSizeByID(id) {
    
    return async (dispatch, getState) => {
      dispatch(sizesLoading(true))
      const { token } = getState().staffLogin.auth;
      const result = await sizeService.deleteSizes(token, id)

      if (result.isResultOk() && result.data.success) {
        logger.info("size deleted")
        dispatch(sizesDeleted(id));
        dispatch(sizesLoading(false))
        dispatch(displayToastAsync(buildNotification("Size deleted Successfully", NOTIFICATION_TYPE.SUCCESS)))

      } else { 
        logger.info("sizes api error")
        dispatch(sizesLoading(false))
        dispatch(displayToastAsync(buildNotification("Size fail to delete", NOTIFICATION_TYPE.ERROR)))
        return;
      }
    };
  }
  

  

