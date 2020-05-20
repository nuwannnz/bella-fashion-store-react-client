export const NOTIFICATION_TYPE = {
  SUCCESS: "SUCCESS",
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