import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ROUTE_PATHS } from "../../Constants";
import Homepage from './Homepage';
import ProductPage from "./ProductPage";


export default class CustomerShell extends Component {
  render() {
    return (
      <div className="flex w-100 h-100">
        <Switch>

          <Route path={ROUTE_PATHS.CUSTOMER_LOGIN} >
            {/* Put login component here  */}
            <div>Login</div>
          </Route>

          <Route path={ROUTE_PATHS.CUSTOMER_SHELL}>
            <Homepage />
          </Route>
          <Route path={ROUTE_PATHS.CUSTOMER_PRODUCT}>
            <ProductPage />
          </Route>
        </Switch>
      </div>
    );
  }
}
