import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import Homepage from './Homepage';
import CustomerLoginPage from "./CustomerLoginPage";


export default class CustomerShell extends Component {
  render() {
    return (
      <div className="flex w-100 h-100">
        <Switch>

          <Route path={ROUTE_PATHS.CUSTOMER_LOGIN} >
            <CustomerLoginPage />
          </Route>

          <Route path={ROUTE_PATHS.CUSTOMER_SHELL}>
            <Homepage />
          </Route>
        </Switch>
      </div>
    );
  }
}
