import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ROUTE_PATHS, POPUP_KEYS } from "../../constants";
import Homepage from "./Homepage";
import CustomerLoginPage from "./CustomerLoginPage";
import CustomerSignUpPage from "./CustomerSignUpPage";
import AboutUs from "./AboutUs";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyStoredTokenAsync,
  checkHasCustomerAsync,
} from "../../redux/actions/customer/customer.actions";
import { uiIsLoading } from "../../redux/actions/ui.actions";
import { usePopup } from "../../hooks/Popup.hooks";
import CustomerDashboardAddressForm from "../../components/customer/CustomerDashboardAddressForm";

export default function CustomerShell() {
  const dispatch = useDispatch();
  const { registerPopup } = usePopup()

  const hasCustomerChecked = useSelector(
    (state) => state.customer.checkedHasCustomer
  );
  const verifyedToken = useSelector((state) => state.customer.tokenVerified);

  useEffect(() => {
    registerPopup(POPUP_KEYS.ADDRESS_POPUP, CustomerDashboardAddressForm);
  }, [])

  useEffect(() => {
    // set ui to loading

    // if we did not check has customer, check it
    if (!hasCustomerChecked) {
      dispatch(uiIsLoading(true));

      dispatch(checkHasCustomerAsync());
    }

    // if we did not checked the saved token, check it
    if (!verifyedToken) {
      dispatch(uiIsLoading(true));

      dispatch(verifyStoredTokenAsync());
    }

    if (verifyedToken && hasCustomerChecked) {
      dispatch(uiIsLoading(false));
    }
  });

  return (
    <div className="flex w-100 h-100">
      <Switch>
        <Route path={ROUTE_PATHS.CUSTOMER_LOGIN}>
          <CustomerLoginPage />
        </Route>

        <Route path={ROUTE_PATHS.CUSTOMER_SIGNUP}>
          <CustomerSignUpPage />
        </Route>

        <Route path={ROUTE_PATHS.CUSTOMER_ABOUTUS}>
          <AboutUs />
        </Route>

        <Route path={ROUTE_PATHS.CUSTOMER_SHELL}>
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}
