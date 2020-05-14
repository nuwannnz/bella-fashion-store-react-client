export const NOTIFICATION_TYPE = {
    INFO: "INFO",
    ERROR: "ERROR",
  };
  
  export const buildNotification = (msg, type) => {
    const notification = {
      message: msg,
      type,
    };
  
    return notification;
  };