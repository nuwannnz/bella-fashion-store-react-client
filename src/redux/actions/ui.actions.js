export const UI_ACTION_TYPES = {
  UI_IS_LOADING: "UI_IS_LOADING",
  MOBILE_SIDEBAR_TOGGLE: "MOBILE_SIDEBAR_TOGGLE",

  CART_BAR_TOGGLE: "CART_BAR_TOGGLE",
  DISPLAY_CHECKOUT: "DISPLAY_CHECKOUT",

  WISHLIST_BAR_TOGGLE: "WISHLIST_BAR_TOGGLE",
  DISPLAY_CART: "DISPLAY_CART" 

};

export const uiIsLoading = (val) => ({
  type: UI_ACTION_TYPES.UI_IS_LOADING,
  payload: val,
});

export const toggleMobileSideBar = () => ({
  type: UI_ACTION_TYPES.MOBILE_SIDEBAR_TOGGLE,
});


export const toggleCartBar = () => ({
  type: UI_ACTION_TYPES.CART_BAR_TOGGLE

})

export const toggleDisplayCheckout = () => ({
  type: UI_ACTION_TYPES.DISPLAY_CHECKOUT

})

export const toggleWishlistBar = () => ({
  type: UI_ACTION_TYPES.WISHLIST_BAR_TOGGLE
})

export const toggleDisplayCart = () => ({
  type: UI_ACTION_TYPES.DISPLAY_CART
})