export const POPUP_ACTION_TYPES = {
    OPEN_POPUP: 'OPEN_POPUP',
    CLOSE_POPUP: 'CLOSE_POPUP'
}

export const openPopup = (popupKey, popupProps = {}) => ({
    type: POPUP_ACTION_TYPES.OPEN_POPUP,
    payload: { popupKey, popupProps }
})

export const closePopup = (popupKey) => ({
    type: POPUP_ACTION_TYPES.CLOSE_POPUP,
    payload: popupKey
})