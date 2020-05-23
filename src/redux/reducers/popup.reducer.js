import { POPUP_ACTION_TYPES } from "../actions/popup.actions";
const initialState = {
    openedPopups: []
}

export const popup = (state = initialState, action) => {
    switch (action.type) {
        case POPUP_ACTION_TYPES.OPEN_POPUP:
            return {
                openedPopups: [
                    ...state.openedPopups,
                    { key: action.payload.popupKey, props: action.payload.popupProps }
                ],

            }

        case POPUP_ACTION_TYPES.CLOSE_POPUP:
            return {
                openedPopups: state.openedPopups.filter(p => p.key !== action.payload)
            };


        default:
            return state

    }
}

