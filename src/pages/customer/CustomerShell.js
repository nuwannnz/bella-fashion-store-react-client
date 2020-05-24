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
import CustomerDashboardInquiryForm from "../../components/customer/CustomerDashboardInquiryForm";
import CustomerInquiryForm from "../../components/customer/CustomerInquiryForm";
import ReplyCustomerInquiryForm from "../../components/customer/ReplyCustomerInquiryForm";
import ForgotPwdEmailPage from "./ForgotPwdEmailPage";
import ForgotPwdVerifyPage from "./ForgotPwdVerifyPage";
import ForgotPwdNewPwdPage from "./ForgotPwdNewPwdPage";
import ProductReviewForm from "./product-review/ProductReviewForm";

export default function CustomerShell() {
  const dispatch = useDispatch();
  const { registerPopup } = usePopup();

  const hasCustomerChecked = useSelector(
    (state) => state.customer.checkedHasCustomer
  );
  const verifyedToken = useSelector((state) => state.customer.tokenVerified);

  useEffect(() => {
    registerPopup(POPUP_KEYS.ADDRESS_POPUP, CustomerDashboardAddressForm);
    registerPopup(POPUP_KEYS.INQUIRY_POPUP, CustomerDashboardInquiryForm);
    registerPopup(POPUP_KEYS.CUSTOMER_INQUIRY_POPUP, CustomerInquiryForm);
    registerPopup(POPUP_KEYS.PRODUCT_REVIEW_POPUP, ProductReviewForm);

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

  useEffect(() => {
    registerPopup(POPUP_KEYS.ADDRESS_POPUP, CustomerDashboardAddressForm);
  }, []);

  return (
    <div className="flex w-100 h-100">
      <Switch>
        <Route path={ROUTE_PATHS.CUSTOMER_LOGIN}>
          <CustomerLoginPage />
        </Route>

        <Route path={ROUTE_PATHS.CUSTOMER_FORGOT_PWD_EMAIL}>
          <ForgotPwdEmailPage />
        </Route>

        <Route path={`${ROUTE_PATHS.CUSTOMER_FORGOT_PWD_VERIFY}/:email`}>
          <ForgotPwdVerifyPage />
        </Route>

        <Route path={ROUTE_PATHS.CUSTOMER_FORGOT_PWD_NEW_PWD}>
          <ForgotPwdNewPwdPage />
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
