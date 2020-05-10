import { NOTIFICATION_ACTION_TYPES } from "../../actions/customer/notification.actions";

const initialState = {
  dispayNotification: false,
  notification: null,
};

export const notification = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_ACTION_TYPES.NOTIFICATION_CHANGED:
      return {
        ...state,
        notification: action.payload,
      };

    case NOTIFICATION_ACTION_TYPES.NOTIFICATION_DISPLAYED:
      return {
        ...state,
        dispayNotification: true,
      };

    case NOTIFICATION_ACTION_TYPES.NOTIFICATION_HIDE:
      return {
        ...state,
        dispayNotification: false,
      };

    default:
      return state;
  }
};
