
export const UI_ACTION_TYPES = {
    UI_IS_LOADING: 'UI_IS_LOADING'
}

export const uiIsLoading = (val) => ({
    type: UI_ACTION_TYPES.UI_IS_LOADING,
    payload: val
});