import React from "react";
import AdminSignUpForm from "../../../components/admin/AdminSignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { signUpAdminAsync } from "../../../redux/actions/admin-panel/staff.actions";
import { getAssetUrl } from "../../../helpers/assets.helper";
import "../../../styles/LoginPage.css";
import { useHistory } from "react-router-dom";

export default function AdminSignUpPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const errorMsg = useSelector(state => state.staffLogin.ui.errorMsg);
    const isLoading = useSelector(state => state.staffLogin.ui.isLoading);

    return (
        <div className="page login-page-wrap flex align-center flex-c">
            <div className="logo">
                <img src={getAssetUrl("logo/logo.png")} alt="Bella logo" />
            </div>
            <h2>Sign up as administrator of the <br /> Bella Admin Panel</h2>
            <AdminSignUpForm
                errorMsg={errorMsg}
                onSignUpClick={(email, fName, lName) =>
                    dispatch(signUpAdminAsync(email, fName, lName, history))
                }
            />
        </div>
    );
}
