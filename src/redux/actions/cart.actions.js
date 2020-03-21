

export const CART_ACTION_TYPES = {
    ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART'
}

export const addItemToCart = (item) => ({
    type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
    payload: item
});