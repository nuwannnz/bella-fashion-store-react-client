import React, { useCallback } from "react";
import globalHook from "use-global-hook";

const initialState = {
    popupTypes: []
}

const actions = {
    registerPopupType: (store, popupKey, popupComponent) => {
        const newPopupTypes = [...store.state.popupTypes, { popupKey, popupComponent }];
        store.setState({ popupTypes: newPopupTypes });
    }
}

const useGlobal = globalHook(React, initialState, actions);

export function usePopup() {
    const [popupTypesState, popupTypeActions] = useGlobal();

    const registerPopup = useCallback((popupKey, popupComponent) => {
        popupTypeActions.registerPopupType(popupKey, popupComponent);
    }, [])

    return {
        popupTypes: popupTypesState.popupTypes,
        registerPopup
    }
}