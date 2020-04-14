import React, { useEffect } from "react";
import { useHistory, Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import * as staffService from "../../services/admin/staff.service";
import { ROUTE_PATHS } from "../../Constants";
import { useDispatch } from "react-redux";
import {
  loggedIn,
  userLoaded,
} from "../../redux/actions/admin-panel/staff.actions";
import LoginPage from "./staff/LoginPage";

export default function AdminPanelShell() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.staff.token);
  const userInfo = useSelector((state) => state.staff.userInfo);

  useEffect(() => {
    if (userToken !== null && userInfo !== null) {
      // navigate to update temp password page
      if (userInfo.isNew) {
        history.push(ROUTE_PATHS.ADMIN_UPDATE_TEMP_PWD);
      } else {
        history.push(ROUTE_PATHS.ADMIN_DASHBOARD);
      }
    } else if (userToken === null) {
      history.push(`${ROUTE_PATHS.ADMIN_LOGIN}`);
    }
  }, [userToken, userInfo]);

  useEffect(() => {
    async function navigateToSignupPage() {
      const hasAdmin = await staffService.getHasAdmin();
      if (hasAdmin) {
        history.push(ROUTE_PATHS.ADMIN_SIGNUP);
      }
    }
    navigateToSignupPage();
  });

  useEffect(() => {
    async function verifyStoredToken() {
      const result = await staffService.verifyStoredToken();
      if (result !== null) {
        // stored token is verified
        dispatch(userLoaded(result.userInfo));
        dispatch(loggedIn(result.token));
      }
    }
    verifyStoredToken();
  });

  return (
    <Switch>
      <Route path={`${ROUTE_PATHS.ADMIN_LOGIN}`}>
        <LoginPage />
      </Route>
      <Route path={ROUTE_PATHS.ADMIN_SIGNUP}></Route>

      <Route path={ROUTE_PATHS.ADMIN_UPDATE_TEMP_PWD}></Route>

      <Route path={ROUTE_PATHS.ADMIN_DASHBOARD}>
        <div>Admin dashboard</div>
      </Route>
    </Switch>
  );
}
