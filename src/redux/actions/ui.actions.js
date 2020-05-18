export const UI_ACTION_TYPES = {
  UI_IS_LOADING: "UI_IS_LOADING",
  MOBILE_SIDEBAR_TOGGLE: "MOBILE_SIDEBAR_TOGGLE",
};

export const uiIsLoading = (val) => ({
  type: UI_ACTION_TYPES.UI_IS_LOADING,
  payload: val,
});

export const toggleMobileSideBar = () => ({
  type: UI_ACTION_TYPES.MOBILE_SIDEBAR_TOGGLE,
});
