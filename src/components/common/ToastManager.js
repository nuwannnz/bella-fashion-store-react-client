import React from 'react'
import "../../styles/common/Toast.css";
import { useSelector, useDispatch } from 'react-redux';
import { NOTIFICATION_TYPE } from '../../helpers/notification.helper';
import { hideToast } from '../../redux/actions/toast.actions';

const Toast = ({ toast }) => {
    const dispatch = useDispatch();

    const closeClickHandler = () => {
        dispatch(hideToast(toast.id));
    }
    const typeClass = () => {
        switch (toast.type) {
            case NOTIFICATION_TYPE.ERROR:
                return 'toast-error'
            case NOTIFICATION_TYPE.SUCCESS:
                return 'toast-success'
            case NOTIFICATION_TYPE.INFO:
                return 'toast-info'
            default:
                return ''
        }
    }
    return (
        <div className={`toast ${typeClass()} ${toast.hiding && 'toast-hiding'}`}>
            <span>{toast.message}</span>
            <span class="toast-close-btn" onClick={closeClickHandler}><i className="fas fa-times-circle"></i></span>
        </div>
    )
}

export default function ToastManger() {
    const toastList = useSelector(state => state.toast.items);

    return (
        <div className="toast-wrapper">
            {
                toastList && toastList.map((toast, i) =>
                    <Toast key={i} toast={toast} />
                )
            }
        </div>
    )
}
