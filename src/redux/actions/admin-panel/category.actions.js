import * as categoryService from "../../../services/admin/category.service";
import * as staffService from "../../../services/admin/staff.service";
import { ROUTE_PATHS } from "../../../constants";

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
    NEWSUBCATEGORY_CREATED: "NEWSUBCATEGORY_CREATED",
    NEWSUBCATEGORY_CREATED_ERROR: "NEWSUBCATEGORY_ERROR",
    NEWSUBCATEGORY_UPDATED: "NEWSUBCATEGORY_UPDATED",
    NEWSUBCATEGORY_UPDATED_ERROR: "NEWSUBCATEGORY_UPDATED_ERROR",
    NEWSUBCATEGORY_DELETED: "NEWSUBCATEGORY_DELETED",
    NEWSUBCATEGORY_DELETED_ERROR: "NEWSUBCATEGORY_DELETED_ERROR",
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


export const updateCategory = (categoryId,updatedCategoryName) => ({
    type: CATEGORY_ACTION_TYPES.NEWCATEGORY_UPDATED,
    payload: categoryId,updatedCategoryName

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

export const createSubCategory = (category) => ({
  type: CATEGORY_ACTION_TYPES.NEWSUBCATEGORY_CREATED,
  payload: category
});

const createSubCategoryError = () => ({
  type: CATEGORY_ACTION_TYPES.NEWSUBCATEGORY_CREATED_ERROR,
});


export const updateSubCategory = (categoryID,subcategoryName, NewSubCategoryName) => ({
  type: CATEGORY_ACTION_TYPES.NEWSUBCATEGORY_UPDATED,
  payload: subcategoryName

});

const updateSubCategoryError = () => ({
  type: CATEGORY_ACTION_TYPES.NEWSUBCATEGORY_UPDATED_ERROR,
});

export const deleteSubCategory = (SubcategoryID) => ({
  type: CATEGORY_ACTION_TYPES.NEWSUBCATEGORY_DELETED,
  payload: SubcategoryID
});

const deleteSubCategoryError = () => ({
  type: CATEGORY_ACTION_TYPES.NEWSUBCATEGORY_UPDATED_ERROR,

});
export const userLoaded = (user) => ({
  type: STAFF_ACTION_TYPES.USER_INFO_LOADED,
  payload: user,
});

export const loggedIn = (token) => ({
  type: STAFF_ACTION_TYPES.LOGGED_IN,
  payload: token,
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



export function addNewCategoryAsync(categoryName) {
    return async (dispatch) => {
      // delete token from storage
      dispatch(isLoading(true));

  
      // get result from API
      const result = await categoryService.newCategory(categoryName);
  
      if (result.isResultOk()) {


        dispatch(createCategory(result.data));
  
      } else {

        // set error message
        dispatch(createCategoryError());
  
      }
      // set isLoading to false
      dispatch(isLoading(false));
    };
  }

  export function addNewSubCategoryAsync(categoryName,SubCategoryName) {
    return async (dispatch) => {

      dispatch(isLoading(true));
  
      const result = await categoryService.newSubCategory(categoryName,SubCategoryName);
  
      if (result.isResultOk()) {

        dispatch(createSubCategory(result.data));
  
      } else {
  
        // set error message
        dispatch(createSubCategoryError());
  
      }
      // set isLoading to false
      dispatch(isLoading(false));
    };
  }

export function deleteCategoryAsync(categoryID) {
    return async (dispatch, getState) => {
      // delete token from storage
      const result = await categoryService.deleteCategory(categoryID);
      if (result.deletedCount === 1) {
        // update category Name

        dispatch(deleteCategory(categoryID));
      } else {
        // display error notification
        dispatch(deleteCategoryError());
      }
  
    };
  }

  export function deleteSubCategoryAsync(categoryID) {
    return async (dispatch, getState) => {
      // delete token from storage
      const result = await categoryService.deleteCategory(categoryID);
      if (result.isResultOk()) {
        // update category Name

        dispatch(deleteCategory(categoryID));
      } else {
        // display error notification
        dispatch(deleteCategoryError());
      }
  
    };
  }

  export function updateCategoryAsync(categoryId,updatedCategoryName) {
    return async (dispatch, getState) => {

  
      const result = await categoryService.updateCategory(categoryId,updatedCategoryName);
      if (result.isResultOk() && result.success ) {
        // update category Name

        dispatch(updateCategory(categoryId,updatedCategoryName));
      } else {
        // display error notification
        dispatch(updateCategoryError());
      }
    };
  }

  export function updateSubCategoryAsync(categoryID,subcategoryName, NewSubCategoryName) {
    return async (dispatch, getState) => {

  
      const result = await categoryService.updateCategory(categoryID,subcategoryName, NewSubCategoryName);
      if (result.isResultOk()) {
        // update category Name

        dispatch(updateSubCategory(categoryID,subcategoryName, NewSubCategoryName));
      } else {
        // display error notification
        dispatch(updateSubCategoryError());
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