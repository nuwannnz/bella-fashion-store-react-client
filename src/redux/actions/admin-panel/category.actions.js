import * as categoryService from "../../../services/admin/category.service";
import * as staffService from "../../../services/admin/staff.service";
import { ROUTE_PATHS } from "../../../Constants";

export const CATEGORY_ACTION_TYPES = {
    IS_LOADING: 'IS_LOADING',
    CATEGORY_INFO_LOADED: "CATEGORY_INFO_LOADED",
    CATEGORY_INFO_LOADED_ERROR: "CATEGORY_INFO_LOADED_ERROR",
    NEWCATEGORY_CREATED: "NEWCATEGORY_CREATED",
    NEWCATEGORY_CREATED_ERROR: "NEWCATEGORY_CREATED_ERROR",
    NEWCATEGORY_UPDATED: "NEWCATEGORY_UPDATED",
    NEWCATEGORY_UPDATED_ERROR: "NEWCATEGORY_UPDATED_ERROR",
    NEWCATEGORY_DELETED: "NEWCATEGORY_DELETED",
    NEWCATEGORY_DELETED_ERROR: "NEWCATEGORY_DELETED_ERROR",
}

export const STAFF_ACTION_TYPES = {
  LOGGED_IN: "LOGGED_IN",
  USER_INFO_LOADED: "USER_INFO_LOADED",
}


export const categoriesLoaded = (categories) => ({
    type: CATEGORY_ACTION_TYPES.CATEGORY_INFO_LOADED,
    payload: categories,
});

const loadingCategoryError = () => ({
    type: CATEGORY_ACTION_TYPES.CATEGORY_INFO_LOADED_ERROR,
});

export const isLoading = (val) => ({
    type: CATEGORY_ACTION_TYPES.IS_LOADING,
    payload: val
})

export const createCategory = (categoryname) => ({
    type: CATEGORY_ACTION_TYPES.NEWCATEGORY_CREATED,
    payload: categoryname
  });

const createCategoryError = () => ({
    type: CATEGORY_ACTION_TYPES.NEWCATEGORY_CREATED_ERROR,
});


export const updateCategory = (categoryid, newcategoryname) => ({
    type: CATEGORY_ACTION_TYPES.NEWCATEGORY_UPDATED,
    payload: categoryid, newcategoryname

  });

const updateCategoryError = () => ({
    type: CATEGORY_ACTION_TYPES.NEWCATEGORY_UPDATED_ERROR,
});

export const deleteCategory = (categoryid) => ({
    type: CATEGORY_ACTION_TYPES.NEWCATEGORY_DELETED,
    payload: categoryid
  });

const deleteCategoryError = () => ({
    type: CATEGORY_ACTION_TYPES.NEWCATEGORY_DELETED_ERROR,

});

export const userLoaded = (user) => ({
  type: STAFF_ACTION_TYPES.USER_INFO_LOADED,
  payload: user,
});

export const loggedIn = (token) => ({
  type: STAFF_ACTION_TYPES.LOGGED_IN,
  payload: token,
});


export function categoriesAsync(categoryID,categoryName) {
    return async (dispatch, getState) => {

            // set isLoading to true
    dispatch(isLoading(true));

    // get result from API
    const result = await categoryService.Categories(categoryID,categoryName);
    
    if (result.isResultOk()) {

        // set user info
        dispatch(categoriesLoaded(result.data.Categories));
  
  
      } else {

        // set error 
        dispatch(loadingCategoryError());
  
      }
      // set isLoading to false
      dispatch(isLoading(false));
    };
}

export function addNewCategoryAsync(categoryName) {
    return async (dispatch) => {
      // delete token from storage
      dispatch(isLoading(true));

  
      // get result from API
      const result = await categoryService.newCategory(categoryName);
  
      if (result.isResultOk() && categoryName!="null") {
        // signup success
        // send user to the login page
        dispatch(createCategory(categoryName));
  
      } else {
  
        // set error message
        dispatch(createCategoryError());
  
      }
      // set isLoading to false
      dispatch(isLoading(false));
    };
  }

export function deleteCategoryAsync(categoryID) {
    return async (dispatch, getState) => {
      // delete token from storage
      deleteCategory(categoryID);
  
    };
  }

  export function updateCategoryAsync(categoryID, NewCategoryName) {
    return async (dispatch, getState) => {
      // get state from the state
      const { token } = getState().staff;
      if (!token) {
      return;
    }
  
      const result = await categoryService.updateCategory(categoryID, NewCategoryName);
      if (result.isResultOk() && result.success && NewCategoryName!="null" ) {
        // update category Name

        dispatch(updateCategory(categoryID, NewCategoryName));
      } else {
        // display error notification
        dispatch(updateCategoryError());
      }
    };
  }
  
  export function verifyStoredTokenAsync() {
    return async (dispatch, getState) => {
      //
      const result = await staffService.verifyStoredToken();
      if (result !== null) {
        // stored token is verified
        dispatch(userLoaded(result.userInfo));
        dispatch(loggedIn(result.token));
      }
    }
  }