import { ROLE_ACTION_TYPES } from "../../../actions/admin-panel/user-dashboard/role.actions";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const roles = (state = initialState, action) => {
  switch (action.type) {
    case ROLE_ACTION_TYPES.GETALL_REQUEST:
      return {
        loading: true,
      };

    case ROLE_ACTION_TYPES.GETALL_SUCCESS:
      return {
        items: action.payload,
      };

    case ROLE_ACTION_TYPES.GETALL_FAILURE:
      return {
        error: action.payload,
      };

    case ROLE_ACTION_TYPES.ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ROLE_ACTION_TYPES.ADD_SUCCESS:
      return {
        items: [...state.items, action.payload],
      };

    case ROLE_ACTION_TYPES.ADD_FAILURE:
      return {
        error: action.payload,
        items: state.items.filter((item) => !item.adding),
      };

    case ROLE_ACTION_TYPES.DELETE_REQUEST:
      return {
        items: state.items.map((item) =>
          item._id === action.payload ? { ...item, deleting: true } : item
        ),
      };

    case ROLE_ACTION_TYPES.DELETE_SUCCESS:
      return {
        items: state.items.filter((item) => item._id !== action.payload),
      };

    case ROLE_ACTION_TYPES.DELETE_FAILURE:
      return {
        error: action.payload.error,
        items: state.items.map((item) => {
          if (item._id === action.payload.id) {
            const { deleting, ...itemInfo } = item;
            return itemInfo;
          }
          return item;
        }),
      };

    case ROLE_ACTION_TYPES.UPDATE_REQUEST:
      return {
        items: state.items.map((item) =>
          item._id === action.payload ? { ...item, updating: true } : item
        ),
      };

    case ROLE_ACTION_TYPES.UPDATE_SUCCESS:
      return {
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    case ROLE_ACTION_TYPES.UPDATE_FAILURE:
      return {
        error: action.payload.error,
        items: state.items.map((item) => {
          if (item._id === action.payload.id) {
            const { updating, ...itemInfo } = item;
            return itemInfo;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};
