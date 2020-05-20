import React, { useEffect } from "react";
import { Header } from "../../components/Header";

import "../../styles/CustomerShell.css";
import CategoryBar from "../../components/customer/CategoryBar";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import CustomerDashboardPage from "./CustomerDashboardPage";
import CustomerDashboardSideBar from "../../components/customer/CustomerDashboardSideBar";
import CartPage from "./CartPage";
import ProductPage from "./ProductPage";
import { loadCartAsync } from "../../redux/actions/customer/cart.actions";
import ProductListPage from "./ProductListPage";
import FloatingCart from "./FloatingCart";
import Checkout from "./Checkout";
import CustomerDashboardAddressPage from "./CustomerDashboardAddressPage";
import CustomerOrderDashboardPage from "./CustomerOrderDashboardPage";
import CustomerDashboardDetailsPage from "./CustomerDashboardDetailPage";

function PrivateRoute({ children, ...rest }) {
  const token = useSelector((state) => state.customer.token);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token !== null ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: ROUTE_PATHS.CUSTOMER_LOGIN,
                state: { from: location },
              }}
            />
          )
      }
    />
  );
}

export default function Homepage() {
  const token = useSelector((state) => state.customer.token);
  const sideBarOpened = useSelector((state) => state.ui.mobileSideBarOpened);
  const displayCheckout = useSelector(state => state.ui.displayCheckout)

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token !== null) {
      // customer logged in
      // load cart and wishlist
      dispatch(loadCartAsync());
    }
  }, [token]);

  return (
    <div className="customer-shell flex flex-r">
      <div className="w-100 flex flex-c">
        <Header />

        <div className="content-wrap flex">
          <div
            className={`category-wrap ${sideBarOpened ? "opened" : "closed"}`}
          >
            {location.pathname.includes(ROUTE_PATHS.CUSTOMER_DASHBOARD) ? (
              <CustomerDashboardSideBar />
            ) : (
                <CategoryBar />
              )}
          </div>

          <FloatingCart />

          {displayCheckout && <Checkout />}

          <div className="page-content-wrap">
            <div className="page">
              <Switch>
                <PrivateRoute path={ROUTE_PATHS.CUSTOMER_DASHBOARD_ACCOUNT_INFO}>
                  <CustomerDashboardDetailsPage />
                </PrivateRoute>
                <PrivateRoute path={ROUTE_PATHS.CUSTOMER_DASHBOARD_ADDRESS}>
                  <CustomerDashboardAddressPage />
                </PrivateRoute>
                <PrivateRoute path={ROUTE_PATHS.CUSTOMER_DASHBOARD_ORDER}>
                  <CustomerOrderDashboardPage />
                </PrivateRoute>
                <PrivateRoute path={ROUTE_PATHS.CUSTOMER_DASHBOARD}>
                  <CustomerDashboardPage />
                </PrivateRoute>

                <PrivateRoute path={ROUTE_PATHS.CUSTOMER_CART}>
                  <CartPage />
                </PrivateRoute>

                <Route path={ROUTE_PATHS.CUSTOMER_PRODUCT}>
                  <ProductPage />
                </Route>

                <Route path="*">
                  <ProductListPage />
                </Route>
              </Switch>
            </div>

            <div className="footer-wrap"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
