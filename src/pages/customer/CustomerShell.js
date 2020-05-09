import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import Homepage from './Homepage';
import CustomerLoginPage from "./CustomerLoginPage";
import CustomerSignUpPage from "./CustomerSignUpPage";
import { useDispatch } from "react-redux";
import { verifyStoredTokenAsync } from "../../redux/actions/customer/customer.actions"


export default function CustomerShell() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyStoredTokenAsync());
  } )

    return (
      <div className="flex w-100 h-100">
        <Switch>

          <Route path={ROUTE_PATHS.CUSTOMER_LOGIN} >
            <CustomerLoginPage />

          </Route>

          <Route path={ROUTE_PATHS.CUSTOMER_SIGNUP}>
            <CustomerSignUpPage />
          </Route>

          <Route path={ROUTE_PATHS.CUSTOMER_SHELL}>
            <Homepage />
          </Route>
        </Switch>
      </div>
    );
  
}
