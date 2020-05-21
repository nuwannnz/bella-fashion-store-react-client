import { TOAST_ACTION_TYPES } from "../actions/toast.actions";

const initialState = {
    items: []
}

export const toast = (state = initialState, action) => {
    switch (action.type) {
        case TOAST_ACTION_TYPES.DISPLAY_TOAST:
            return {
                items: [...state.items, action.payload]
            }

        case TOAST_ACTION_TYPES.HIDE_TOAST_REQUESTED:
            return {
                items: state.items.map(t => t.id === action.payload ? { ...t, hiding: true } : t)
            }

        case TOAST_ACTION_TYPES.HIDE_TOAST:
            return {
                items: state.items.filter(t => t.id !== action.payload)
            }

        default:
            return state;
    }
}