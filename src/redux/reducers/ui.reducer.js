import { UI_ACTION_TYPES } from "../actions/ui.actions";

const initialState = {
  isLoading: false,
  mobileSideBarOpened: false,
  cartBarOpened: false,
  displayCheckout: false
};

export const ui = (state = initialState, action) => {
  switch (action.type) {
    case UI_ACTION_TYPES.UI_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case UI_ACTION_TYPES.MOBILE_SIDEBAR_TOGGLE:
      return {
        ...state,
        mobileSideBarOpened: !state.mobileSideBarOpened,
      };

    case UI_ACTION_TYPES.CART_BAR_TOGGLE:
      return {
        ...state,
        cartBarOpened: !state.cartBarOpened
      }

    case UI_ACTION_TYPES.DISPLAY_CHECKOUT:
      return {
        ...state,
        displayCheckout: !state.displayCheckout
      }

    default:
      return state;
  }
};
