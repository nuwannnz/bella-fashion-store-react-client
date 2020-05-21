import React, { Children, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { POPUP_KEYS } from '../../constants'
import { UserForm } from '../../pages/admin-panel/user-dashboard/UserForm';
import CustomerDashboardAddressForm from "../../components/customer/CustomerDashboardAddressForm";
import { closePopup } from '../../redux/actions/popup.actions';
import { usePopup } from '../../hooks/Popup.hooks';

// const PopUpTypes = [
//     { key: POPUP_KEYS.USER_POPUP, model: <UserForm /> },
//     { key: POPUP_KEYS.ADDRESS_POPUP, model: <CustomerDashboardAddressForm /> },
// ]

export default function PopupContainer() {
    const dispatch = useDispatch();
    const openedPopups = useSelector(state => state.popup.openedPopups)

    const { popupTypes } = usePopup();

    const [models, setModels] = useState([])

    const closePopupHandler = (popupKey) => {
        dispatch(closePopup(popupKey))
    }

    useEffect(() => {
        if (!openedPopups) {
            return;
        }
        const popups = openedPopups.map((popupInfo, i) => {
            const PopupElement = popupTypes.find(p => p.popupKey === popupInfo.key).popupComponent;
            if (!PopupElement || !React.isValidElement(<PopupElement />)) {
                return null;
            }
            return React.cloneElement(<PopupElement />,
                {
                    ...popupInfo.props,
                    key: i,
                    closePopup: () => closePopupHandler(popupInfo.key)
                })
        })
        setModels(popups);
    }, [openedPopups])
    return (
        <div>
            {models}
        </div>
    )
}
