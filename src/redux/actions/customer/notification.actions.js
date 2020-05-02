export const NOTIFICATION_ACTION_TYPES = {
    NOTIFICATION_DISPLAYED: "NOTIFICATION_DISPLAYED",
    NOTIFICATION_HIDE: "NOTIFICATION_HIDE",
    NOTIFICATION_CHANGED: "NOTIFICATION_CHANGED",
  };
  
  export const displayNotification = () => ({
    type: NOTIFICATION_ACTION_TYPES.NOTIFICATION_DISPLAYED,
  });
  
  export const hideNotification = () => ({
    type: NOTIFICATION_ACTION_TYPES.NOTIFICATION_HIDE,
  });
  
  export const setNotification = (notification) => ({
    type: NOTIFICATION_ACTION_TYPES.NOTIFICATION_CHANGED,
    payload: notification,
  });
  
  export function displayTimeoutNotificationAsync(notification) {
    return (dispatch, getState) => {
      dispatch(setNotification(notification));
      dispatch(displayNotification());
  
      setTimeout(() => {
        dispatch(hideNotification());
      }, 4000);
    };
  }
  