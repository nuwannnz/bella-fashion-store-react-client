import { CART_ACTION_TYPES } from "../../actions/customer/cart.actions";

/*
 shape of the product entry
  {
    product: {},
    size : 'M',
    qty: 2
  }
*/

const initialState = {
  items: [],
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case CART_ACTION_TYPES.CART_ITEMS_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CART_ACTION_TYPES.CART_ITEMS_LOAD_SUCCESS:
      return {
        items: action.payload,
      };

    case CART_ACTION_TYPES.CART_ITEMS_LOAD_FAILURE:
      return {
        ...state,
        loadErrorMsg: action.payload,
      };

    case CART_ACTION_TYPES.ADD_ITEM_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
        loadingProductId: action.payload,
      };

    case CART_ACTION_TYPES.ADD_ITEM_TO_CART_SUCCESS:
      return {
        items: [...state.items, action.payload],
      };

    case CART_ACTION_TYPES.ADD_ITEM_TO_CART_FAILURE:
      return {
        items: state.items,
        errorMsg: action.payload,
      };

    case CART_ACTION_TYPES.UPDATE_ITEM_OF_CART_REQUEST:
      return {
        ...state,
        updating: true,
        updatingProductId: action.payload,
      };

    case CART_ACTION_TYPES.UPDATE_ITEM_OF_CART_SUCCESS:
      return {
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    case CART_ACTION_TYPES.UPDATE_ITEM_OF_CART_FAILURE:
      return {
        items: state.items,
        errorMsg: action.payload,
      };

    case CART_ACTION_TYPES.DELETE_ITEM_FROM_CART_REQUEST:
      return {
        ...state,
        deleting: true,
        deletingProductId: action.payload,
      };

    case CART_ACTION_TYPES.DELETE_ITEM_FROM_CART_SUCCESS:
      return {
        items: state.items.filter(
          (productEntry) => productEntry.product._id !== action.payload
        ),
      };

    case CART_ACTION_TYPES.DELETE_ITEM_FROM_CART_FAILURE:
      return {
        items: state.items,
        errorMsg: action.payload,
      };

    case CART_ACTION_TYPES.CLEAR_CART_SUCCESS:
      return {
        items: [],
      };

    case CART_ACTION_TYPES.CLEAR_CART_FAILURE:
      return {
        ...state,
        errorClearCartMsg: action.payload,
      };

    default:
      return state;
  }
};
