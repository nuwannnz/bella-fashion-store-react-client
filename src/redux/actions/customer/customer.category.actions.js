import { ROUTE_PATHS } from "../../../constants";
import * as categoryService from "../../../services/customer/customer.category.service";

export const CUSTOMER_CATEGORY_ACTION_TYPES= {
    CATEGORY_INFO_LOADED: "CATEGORY_INFO_LOADED",
    CATEGORY_INFO_LOADED_ERROR: "CATEGORY_INFO_LOADED_ERROR",
    IS_LOADING: 'IS_LOADING',
    CATEGORY_INFO_LOADED: "CATEGORY_INFO_LOADED",
}

export const isLoading = (val) => ({
    type: CUSTOMER_CATEGORY_ACTION_TYPES.IS_LOADING,
    payload: val
})

export const categoriesLoaded = (categories) => ({
    type: CUSTOMER_CATEGORY_ACTION_TYPES.CATEGORY_INFO_LOADED,
    payload: categories,
});

const loadingCategoryError = () => ({
    type: CUSTOMER_CATEGORY_ACTION_TYPES.CATEGORY_INFO_LOADED_ERROR,
});

export function categoriesAsync() {
    return async (dispatch, getState) => {

            // set isLoading to true
    dispatch(isLoading(true));

    // get result from API
    const result = await categoryService.getCategory();
    
    if (result.isResultOk()) {

        // set user info
        dispatch(categoriesLoaded(result.data));
  
  
      } else {

        // set error 
        dispatch(loadingCategoryError());
  
      }
      // set isLoading to false
      dispatch(isLoading(false));
    };
}