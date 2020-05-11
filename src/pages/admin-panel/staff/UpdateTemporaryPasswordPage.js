import React from "react";
import UpdatePasswordForm from "../../../components/admin/forms/UpdatePasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { updateTempPasswordAsync } from "../../../redux/actions/admin-panel/staff.actions";
import { getAssetUrl } from "../../../helpers/assets.helper";
import "../../../styles/LoginPage.css";
import SuccessMessage from "../../../components/common/SuccessMessage";


export default function LoginPage() {
    const dispatch = useDispatch();


    const errorMsg = useSelector(state => state.staffLogin.ui.errorMsg);
    const successMsg = useSelector(state => state.staffLogin.ui.successMsg);
    const isLoading = useSelector(state => state.staffLogin.ui.isLoading);


    return (
        <div className="page login-page-wrap flex align-center flex-c">
            <div className="logo">
                <img src={getAssetUrl("logo/logo.png")} alt="Bella logo" />
            </div>
            <h2>Update your temporary password <br></br>to activate your Bella account</h2>

            {successMsg.length > 0 ? <SuccessMessage msg={successMsg} /> : null}

            <UpdatePasswordForm
                errorMsg={errorMsg}
                isLoading={isLoading}
                onUpdateClick={(password) =>
                    dispatch(updateTempPasswordAsync(password))
                }
            />
        </div>
    );
}
