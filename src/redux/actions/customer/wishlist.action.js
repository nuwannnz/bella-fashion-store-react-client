import {
  loadWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
  clearWishlist,
} from "../../../services/customer/wishlist.service";

export const WISHLIST_ACTION_TYPES = {
  WISHLIST_ITEMS_LOAD_REQUEST: "WISHLIST_ITEMS_LOAD_REQUEST",
  WISHLIST_ITEMS_LOAD_SUCCESS: "WISHLIST_ITEMS_LOAD_SUCCESS",
  WISHLIST_ITEMS_LOAD_FAILURE: "WISHLIST_ITEMS_LOAD_FAILURE",

  ADD_ITEM_TO_WISHLIST_REQUEST: "ADD_ITEM_TO_WISHLIST_REQUEST",
  ADD_ITEM_TO_WISHLIST_SUCCESS: "ADD_ITEM_TO_WISHLIST_SUCCESS",
  ADD_ITEM_TO_WISHLIST_FAILURE: "ADD_ITEM_TO_WISHLIST_FAILURE",

  DELETE_ITEM_FROM_WISHLIST_REQUEST: "DELETE_ITEM_FROM_WISHLIST_REQUEST",
  DELETE_ITEM_FROM_WISHLIST_SUCCESS: "DELETE_ITEM_FROM_WISHLIST_SUCCESS",
  DELETE_ITEM_FROM_WISHLIST_FAILURE: "DELETE_ITEM_FROM_WISHLIST_FAILURE",

  CLEAR_WISHLIST_SUCCESS: "CLEAR_WISHLIST_SUCCESS",
  CLEAR_WISHLIST_FAILURE: "CLEAR_WISHLIST_FAILURE",
};

export const wishlistLoaded = (payload) => ({
  type: WISHLIST_ACTION_TYPES.WISHLIST_ITEMS_LOAD_SUCCESS,
  payload,
});

export function loadWishlistAsync() {
  return async (dispatch, getState) => {
    dispatch(request());

    const { token } = getState().customer;

    const result = await loadWishlist(token);

    if (result.isResultOk()) {
      dispatch(success(result.data.products));
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function request() {
    return {
      type: WISHLIST_ACTION_TYPES.WISHLIST_ITEMS_LOAD_REQUEST,
    };
  }

  function success(payload) {
    return {
      type: WISHLIST_ACTION_TYPES.WISHLIST_ITEMS_LOAD_SUCCESS,
      payload,
    };
  }

  function failure(payload) {
    return {
      type: WISHLIST_ACTION_TYPES.WISHLIST_ITEMS_LOAD_FAILURE,
      payload,
    };
  }
}

export function addProductToWishlistAsync(productId) {
  return async (dispatch, getState) => {
    dispatch(request());

    const { token } = getState().customer;

    const result = await addProductToWishlist(token, productId);

    if (result.isResultOk()) {
      dispatch(success(result.data.addedEntry));
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function request() {
    return {
      type: WISHLIST_ACTION_TYPES.ADD_ITEM_TO_WISHLIST_REQUEST,
    };
  }

  function success(payload) {
    return {
      type: WISHLIST_ACTION_TYPES.ADD_ITEM_TO_WISHLIST_SUCCESS,
      payload,
    };
  }

  function failure(payload) {
    return {
      type: WISHLIST_ACTION_TYPES.ADD_ITEM_TO_WISHLIST_FAILURE,
      payload,
    };
  }
}

export function removeProductFromWishlistAsync(productId) {
  return async (dispatch, getState) => {
    dispatch(request());

    const { token } = getState().customer;

    const result = await removeProductFromWishlist(token, productId);

    if (result.isResultOk()) {
      dispatch(success(productId));
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function request() {
    return {
      type: WISHLIST_ACTION_TYPES.DELETE_ITEM_FROM_WISHLIST_REQUEST,
    };
  }

  function success(payload) {
    return {
      type: WISHLIST_ACTION_TYPES.DELETE_ITEM_FROM_WISHLIST_SUCCESS,
      payload,
    };
  }

  function failure(payload) {
    return {
      type: WISHLIST_ACTION_TYPES.DELETE_ITEM_FROM_WISHLIST_FAILURE,
      payload,
    };
  }
}

export function clearWishlistAsync() {
  return async (dispatch, getState) => {
    const { token } = getState().customer;

    const result = await clearWishlist(token);

    if (result.isResultOk()) {
      dispatch(success());
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function success() {
    return {
      type: WISHLIST_ACTION_TYPES.CLEAR_WISHLIST_SUCCESS,
    };
  }

  function failure(payload) {
    return {
      type: WISHLIST_ACTION_TYPES.CLEAR_WISHLIST_FAILURE,
      payload,
    };
  }
}
