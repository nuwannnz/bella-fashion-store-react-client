import React, { useEffect, useRef } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTE_PATHS } from "../../Constants";
import { useDispatch } from "react-redux";
import {
  verifyStoredTokenAsync,
  checkHasAdminAsync,
  logoutAsync
} from "../../redux/actions/admin-panel/staff.actions";
import LoginPage from "./staff/LoginPage";
import AdminSignUpPage from "./staff/AdminSignUpPage";
import "../../styles/AdminPanelShell.css";
import { useUserLoggedIn } from "../../hooks/admin-panel/Auth.hooks";
import { uiIsLoading } from "../../redux/actions/ui.actions";


export default function AdminPanelShell() {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLoggedIn = useUserLoggedIn();

  const userInfo = useSelector((state) => { console.log(state); return state.staffLogin.auth.userInfo; });
  const hasAdmin = useSelector((state) => state.staffLogin.ui.hasAdmin);

  // these are just like variables
  const checkedHasAdmin = useRef(false);
  const checkedToken = useRef(false);

  useEffect(() => {

    // set ui to loading
    dispatch(uiIsLoading(true))

    // if we did not check has admin, check it
    if (!checkedHasAdmin.current) {
      dispatch(checkHasAdminAsync());
      checkedHasAdmin.current = true;
    }

    // if we did not checked the saved token, check it
    if (!checkedToken.current) {
      dispatch(verifyStoredTokenAsync());
      checkedToken.current = true;
    }

    let navigateTo = ROUTE_PATHS.ADMIN_DASHBOARD;

    if (userLoggedIn && userInfo !== null) {
      // we are logged in

      if (userInfo.isNewMember) {
        // this is a new user
        // navigate to update temp password page
        navigateTo = ROUTE_PATHS.ADMIN_UPDATE_TEMP_PWD;

      } else {
        // we can go to the dashboard
        navigateTo = ROUTE_PATHS.ADMIN_DASHBOARD;
      }

    } else if (!hasAdmin) {
      // no registered admin 
      // navigate to admin signup page
      navigateTo = ROUTE_PATHS.ADMIN_SIGNUP;

    } else {
      // we are not logged in

      // go to login page
      navigateTo = ROUTE_PATHS.ADMIN_LOGIN;
    }

    // set isloading to false
    setTimeout(() => {
      dispatch(uiIsLoading(false));
    }, 500);

    // navigate 
    history.push(navigateTo);

  }, [userLoggedIn, userInfo, hasAdmin, history, dispatch]);



  return (
    <div className="admin-panel-wrap">

      <Switch>
        <Route path={`${ROUTE_PATHS.ADMIN_LOGIN}`}>
          <LoginPage />
        </Route>
        <Route path={ROUTE_PATHS.ADMIN_SIGNUP}>
          <AdminSignUpPage />
        </Route>

        <Route path={ROUTE_PATHS.ADMIN_UPDATE_TEMP_PWD}>
          <button onClick={() => dispatch(logoutAsync())} >Logout</button>
        </Route>

        <Route path={ROUTE_PATHS.ADMIN_DASHBOARD}>
          <div>Admin dashboard</div>
          <button onClick={() => dispatch(logoutAsync())} >Logout</button>
        </Route>
      </Switch>



    </div>
  );
}
