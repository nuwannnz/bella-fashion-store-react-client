import React from "react";
import UpdatePasswordForm from "../../../components/admin/forms/UpdatePasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { updateTempPasswordAsync } from "../../../redux/actions/admin-panel/staff.actions";
import { getAssetUrl } from "../../../helpers/assets.helper";
import "../../../styles/LoginPage.css";
import SuccessMessage from "../../../components/common/SuccessMessage";
import { useAuthUser } from "../../../hooks/admin-panel/Auth.hooks";
import { Redirect } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants";
import { uiIsLoading } from "../../../redux/actions/ui.actions";


export default function LoginPage() {
    const dispatch = useDispatch();


    const errorMsg = useSelector(state => state.staffLogin.ui.errorMsg);
    const successMsg = useSelector(state => state.staffLogin.ui.successMsg);
    const isLoading = useSelector(state => state.staffLogin.ui.isLoading);

    const authedUser = useAuthUser();

    return (

        !authedUser ?
            (
                <Redirect to={ROUTE_PATHS.ADMIN_LOGIN} />
            ) : (

                !authedUser.isNew ?
                    (
                        <Redirect to={ROUTE_PATHS.ADMIN_DASHBOARD} />
                    ) :
                    (


                        <div className="page login-page-wrap flex align-center flex-c">
                            <div className="logo">
                                <img src={getAssetUrl("logo/logo.png")} alt="Bella logo" />
                            </div>
                            <h2>Update your temporary password <br></br>to activate your Bella account</h2>

                            {successMsg.length > 0 ? <SuccessMessage msg={successMsg} /> : null}

                            <UpdatePasswordForm
                                errorMsg={errorMsg}
                                isLoading={isLoading}
                                onUpdateClick={(password) => {
                                    dispatch(uiIsLoading(true))
                                    dispatch(updateTempPasswordAsync(password))
                                }
                                }
                            />
                        </div >
                    )
            )
    );
}
