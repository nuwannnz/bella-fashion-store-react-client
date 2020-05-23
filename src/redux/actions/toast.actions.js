export const TOAST_ACTION_TYPES = {
    DISPLAY_TOAST: 'DISPLAY_TOAST',
    HIDE_TOAST: 'HIDE_TOAST',
    HIDE_TOAST_REQUESTED: 'HIDE_TOAST_REQUESTED'
}

const displayToast = (toast) => ({
    type: TOAST_ACTION_TYPES.DISPLAY_TOAST,
    payload: toast
})

export const hideToast = (id) => ({
    type: TOAST_ACTION_TYPES.HIDE_TOAST,
    payload: id
})

const hideToastRequested = (id) => ({
    type: TOAST_ACTION_TYPES.HIDE_TOAST_REQUESTED,
    payload: id
})

export function displayToastAsync(toast) {
    return (dispatch) => {
        dispatch(displayToast(toast));

        setTimeout(() => {
            dispatch(hideToastAsync(toast.id));

        }, 3000);
    }
}

export function hideToastAsync(id) {
    return (dispatch) => {
        dispatch(hideToastRequested(id));
        setTimeout(() => {
            dispatch(hideToast(id));
        }, 2000);
    }
}