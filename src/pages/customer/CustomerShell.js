import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import Contact from "../customer/ContactUs"
import Homepage from './Homepage';
import CustomerCategory from './Categories/CustomerCategoryPage'


export default class CustomerShell extends Component {
  render() {
    return (
      <div className="flex w-100 h-100">
        <Switch>

        <Route path={ROUTE_PATHS.CUSTOMER_CONTACT}>
          <Contact/>
        </Route>

        <Route path={ROUTE_PATHS.CUSTOMER_CATEGORIES}>
          <CustomerCategory/>
        </Route>
        

          <Route path={ROUTE_PATHS.CUSTOMER_LOGIN} >
            {/* Put login component here  */}
            <div>Login</div>
          </Route>

          

          <Route path={ROUTE_PATHS.CUSTOMER_SHELL}>
            <Homepage />
          </Route>

          
        </Switch>
      </div>
    );
  }
}
