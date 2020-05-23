import { v4 as uuidv4 } from 'uuid';

export const NOTIFICATION_TYPE = {
    INFO: "INFO",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
};

export const buildNotification = (msg, type) => {
    const notification = {
        id: uuidv4(),
        message: msg,
        type,
    };

    return notification;
};
