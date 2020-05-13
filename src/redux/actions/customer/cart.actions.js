import {
  loadCart,
  addProductToCart,
  updateProductOfCart,
  removeProductFromCart,
  clearCart,
} from "../../../services/customer/cart.service";

export const CART_ACTION_TYPES = {
  CART_ITEMS_LOAD_REQUEST: "CART_ITEMS_LOAD_REQUEST",
  CART_ITEMS_LOAD_SUCCESS: "CART_ITEMS_LOAD_SUCCESS",
  CART_ITEMS_LOAD_FAILURE: "CART_ITEMS_LOAD_FAILURE",

  ADD_ITEM_TO_CART_REQUEST: "ADD_ITEM_TO_CART_REQUEST",
  ADD_ITEM_TO_CART_SUCCESS: "ADD_ITEM_TO_CART_SUCCESS",
  ADD_ITEM_TO_CART_FAILURE: "ADD_ITEM_TO_CART_FAILURE",

  UPDATE_ITEM_OF_CART_REQUEST: "UPDATE_ITEM_OF_CART_REQUEST",
  UPDATE_ITEM_OF_CART_SUCCESS: "UPDATE_ITEM_OF_CART_SUCCESS",
  UPDATE_ITEM_OF_CART_FAILURE: "UPDATE_ITEM_OF_CART_FAILURE",

  DELETE_ITEM_FROM_CART_REQUEST: "DELETE_ITEM_FROM_CART_REQUEST",
  DELETE_ITEM_FROM_CART_SUCCESS: "DELETE_ITEM_FROM_CART_SUCCESS",
  DELETE_ITEM_FROM_CART_FAILURE: "DELETE_ITEM_FROM_CART_FAILURE",

  CLEAR_CART_SUCCESS: "CLEAR_CART_SUCCESS",
  CLEAR_CART_FAILURE: "CLEAR_CART_FAILURE",
};

export function loadCartAsync() {
  return async (dispatch, getState) => {
    dispatch(request());

    const { token } = getState().customer;

    const result = await loadCart(token);

    if (result.isResultOk()) {
      dispatch(success(result.data.products));
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function request() {
    return { type: CART_ACTION_TYPES.CART_ITEMS_LOAD_REQUEST };
  }

  function success(payload) {
    return { type: CART_ACTION_TYPES.CART_ITEMS_LOAD_SUCCESS, payload };
  }

  function failure(payload) {
    return { type: CART_ACTION_TYPES.CART_ITEMS_LOAD_FAILURE, payload };
  }
}

export function addProductToCartAsync(productId, size, qty) {
  return async (dispatch, getState) => {
    dispatch(request());

    const { token } = getState().customer;

    const result = await addProductToCart(token, productId, size, qty);

    if (result.isResultOk()) {
      dispatch(success(result.data.addedEntry));
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function request() {
    return { type: CART_ACTION_TYPES.ADD_ITEM_TO_CART_REQUEST };
  }

  function success(payload) {
    return { type: CART_ACTION_TYPES.ADD_ITEM_TO_CART_SUCCESS, payload };
  }

  function failure(payload) {
    return { type: CART_ACTION_TYPES.ADD_ITEM_TO_CART_FAILURE, payload };
  }
}

export function updateProductOfCartAsync(productId, size, qty) {
  return async (dispatch, getState) => {
    dispatch(request());

    const { token } = getState().customer;

    const result = await updateProductOfCart(token, productId, size, qty);

    if (result.isResultOk()) {
      dispatch(success(result.data));
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function request() {
    return { type: CART_ACTION_TYPES.UPDATE_ITEM_OF_CART_REQUEST };
  }

  function success(payload) {
    return { type: CART_ACTION_TYPES.UPDATE_ITEM_OF_CART_SUCCESS, payload };
  }

  function failure(payload) {
    return { type: CART_ACTION_TYPES.UPDATE_ITEM_OF_CART_FAILURE, payload };
  }
}

export function removeProductFromCartAsync(productId, size) {
  return async (dispatch, getState) => {
    dispatch(request());

    const { token } = getState().customer;

    const result = await removeProductFromCart(token, productId, size);

    if (result.isResultOk()) {
      dispatch(success(productId));
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function request() {
    return { type: CART_ACTION_TYPES.DELETE_ITEM_FROM_CART_REQUEST };
  }

  function success(payload) {
    return { type: CART_ACTION_TYPES.DELETE_ITEM_FROM_CART_SUCCESS, payload };
  }

  function failure(payload) {
    return { type: CART_ACTION_TYPES.DELETE_ITEM_FROM_CART_FAILURE, payload };
  }
}

export function clearCartAsync() {
  return async (dispatch, getState) => {
    const { token } = getState().customer;

    const result = await clearCart(token);

    if (result.isResultOk()) {
      dispatch(success());
    } else {
      dispatch(failure(result.errorMessage));
    }
  };

  function success() {
    return { type: CART_ACTION_TYPES.CLEAR_CART_SUCCESS };
  }

  function failure(payload) {
    return { type: CART_ACTION_TYPES.CLEAR_CART_FAILURE, payload };
  }
}
