import React, { useEffect } from "react";
import { Header } from "../../components/Header";
import "../../styles/CustomerShell.css";
import CategoryBar from "../../components/customer/CategoryBar";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { ROUTE_PATHS, POPUP_KEYS } from "../../constants";
import CustomerDashboardPage from "./CustomerDashboardPage";
import CustomerDashboardSideBar from "../../components/customer/CustomerDashboardSideBar";
import ProductPage from "./ProductPage";
import { loadCartAsync } from "../../redux/actions/customer/cart.actions";
import ProductListPage from "./ProductListPage";
import FloatingCart from "./FloatingCart";
import Checkout from "./checkout/Checkout";
import CustomerDashboardAddressPage from "./CustomerDashboardAddressPage";
import CustomerOrderDashboardPage from "./CustomerOrderDashboardPage";
import CustomerDashboardDetailsPage from "./CustomerDashboardDetailPage";
import FloatingWishlist from "./FloatingWishlist";
import { loadOrdersAync } from "../../redux/actions/customer/order.actions";
import { openPopup, POPUP_ACTION_TYPES } from "../../redux/actions/popup.actions";
import { categoriesAsync } from "../../redux/actions/customer/customer.category.actions";
import Footer from "../../components/customer/Footer";


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
  const displayCheckout = useSelector(state => state.ui.displayCheckout);
  const displayCart = useSelector((state) => state.ui.displayCart);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('homepage')
    if (token !== null) {
      // customer logged in
      // load cart and wishlist
      dispatch(loadCartAsync());

      // load orders of the customer
      dispatch(loadOrdersAync());

      // load categories
      dispatch(categoriesAsync());

    }
  }, [token]);

  const toggleDisplayInquiryForm = () => {
    dispatch(openPopup(POPUP_KEYS.INQUIRY_POPUP));
  }

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

          <FloatingWishlist />

          {displayCheckout && <Checkout />}

          {displayCart && <FloatingCart />}

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

                <Route path={`${ROUTE_PATHS.CUSTOMER_PRODUCT}/:productId`}>
                  <ProductPage />
                </Route>

                <Route path={`${ROUTE_PATHS.CUSTOMER_PRODUCT_CATEGORY}/:categoryName/:subCategoryName`}>
                  <ProductListPage />
                </Route>

                <Route path={`${ROUTE_PATHS.CUSTOMER_PRODUCT_CATEGORY}/:categoryName`}>
                  <ProductListPage />
                </Route>


                {/* <Route path="*">
                  <ProductListPage />
                </Route> */}
              </Switch>

              <div className="customer-inquiry-wrapper">
                <div className="customer-inquiry-btn">
                  <button className="inquiry-btn" onClick={toggleDisplayInquiryForm}>INQUIRY NOW!</button>
                </div>
              </div>

            </div>



            <div className="footer-wrap">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
