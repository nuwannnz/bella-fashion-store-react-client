import { USER_DASHBOAR_ACTION_TYPES } from "../../../actions/admin-panel/user-dashboard/user.actions";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case USER_DASHBOAR_ACTION_TYPES.GETALL_REQUEST:
      return {
        loading: true,
      };

    case USER_DASHBOAR_ACTION_TYPES.GETALL_SUCCESS:
      return {
        items: action.payload,
      };

    case USER_DASHBOAR_ACTION_TYPES.GETALL_FAILURE:
      return {
        error: action.payload,
      };

    case USER_DASHBOAR_ACTION_TYPES.ADD_REQUEST:
      return {
        ...state,
        addingItem: true,
      };

    case USER_DASHBOAR_ACTION_TYPES.ADD_SUCCESS:
      return {
        items: [...state.items, action.payload],
      };

    case USER_DASHBOAR_ACTION_TYPES.ADD_FAILURE:
      return {
        error: action.payload,
      };

    case USER_DASHBOAR_ACTION_TYPES.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map((user) =>
          user._id === action.payload ? { ...user, deleting: true } : user
        ),
      };

    case USER_DASHBOAR_ACTION_TYPES.DELETE_SUCCESS:
      return {
        items: state.items.filter((user) => user._id !== action.payload),
      };

    case USER_DASHBOAR_ACTION_TYPES.DELETE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        items: state.items.map((user) => {
          if (user._id === action.payload.id) {
            const { deleting, ...userInfo } = user;
            return userInfo;
          }
          return user;
        }),
      };

    case USER_DASHBOAR_ACTION_TYPES.UPDATE_SUCCESS:
      return {
        items: state.items.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };

    case USER_DASHBOAR_ACTION_TYPES.UPDATE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        items: state.items.map((user) => {
          if (user._id === action.payload.id) {
            const { updating, ...userInfo } = user;
            return userInfo;
          }
          return user;
        }),
      };
    case USER_DASHBOAR_ACTION_TYPES.UPDATE_REQUEST:
      return {
        ...state,
        items: state.items.map((user) =>
          user._id === action.payload ? { ...user, updating: true } : user
        ),
      };

    default:
      return state;
  }
};
