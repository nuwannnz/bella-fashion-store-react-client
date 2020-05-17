import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { getAssetUrl } from "../helpers/assets.helper";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileSideBar, toggleCartBar } from "../redux/actions/ui.actions";
import { Link, useHistory } from "react-router-dom";
import { ROUTE_PATHS } from "../constants";
import { logoutAsync } from "../redux/actions/customer/customer.actions";

const Logo = () => (
  <div className="logo-wrap flex-center">
    <Link to={ROUTE_PATHS.CUSTOMER_SHELL}>
      <div className="logo">
        <img src={getAssetUrl("/logo/logo-text-accent.png")} alt="logo" />
      </div>
    </Link>
  </div>
);

const SearchBox = ({ onSearchSubmit }) => {
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      // enter pressed
      onSearchSubmit(e.target.value);
    }
  };

  return (
    <div id="search-box" className="search-box-wrap">
      <input className="search-box" placeholder="Search for items and brands" />
      <span className="search-icon">
        <i className="fas fa-search" onKeyUp={handleKeyUp}></i>
      </span>
    </div>
  );
};

const CustomerAvatar = () => {
  const customerInfo = useSelector((state) => state.customer.customerInfo);
  const history = useHistory();
  const dispatch = useDispatch();

  const [menuExpanded, setMenuExpanded] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (
        e.target &&
        e.target.classList &&
        !e.target.classList.contains("customer-menu-item") &&
        !e.target.classList.contains("customer-menu-item-text")
      ) {
        setMenuExpanded(false);
      }
    });

    history.listen(() => {
      setMenuExpanded(false);
    });
  }, []);

  const handleDashboardBtnClicked = () => {
    history.push(ROUTE_PATHS.CUSTOMER_DASHBOARD);
  };
  const handleLogoutClicked = () => {
    dispatch(logoutAsync(history));
  };

  return (
    <div className="customer-avatar-wrap">
      <div
        className={`customer-info`}
        onClick={() => setMenuExpanded(!menuExpanded)}
      >
        <span>{customerInfo && customerInfo.fName}</span>
      </div>

      {menuExpanded && (
        <div className="customer-expand-menu">
          <div className="customer-menu">
            <div
              className="customer-menu-item"
              onClick={handleDashboardBtnClicked}
            >
              <span className="customer-menu-item-text">Dashboard</span>
            </div>
            <div className="customer-menu-item" onClick={handleLogoutClicked}>
              <span className="customer-menu-item-text">Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CustomerMenu = () => {
  const token = useSelector((state) => state.customer.token);

  return (
    <div className="customer-menu">
      <div className="customer-avatar">
        {token ? (
          <CustomerAvatar />
        ) : (
            <Link to={ROUTE_PATHS.CUSTOMER_LOGIN}>
              <div className="customer-menu-login-btn">
                <span>Login</span>
              </div>
            </Link>
          )}
      </div>
    </div>
  );
};

const CartButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.customer.token);

  const onCartBtnClick = () => {
    if (token === null) {
      // user not logged in
      history.push(ROUTE_PATHS.CUSTOMER_LOGIN);
    }
    dispatch(toggleCartBar());
  }

  return (
    // <Link to={ROUTE_PATHS.CUSTOMER_CART}>
    <button className="header-btn badge-btn" style={{ marginRight: "25px" }} onClick={onCartBtnClick}>
      <i className="fas fa-shopping-basket"></i>
      {cartItems && (
        <span className="product-count-badge">{cartItems.length}</span>
      )}
    </button>
    // </Link>
  );
};

const HeaderButtonGroup = () => {
  return (
    <div className="header-btn-group flex">
      <button id="m-search-btn" className="header-btn">
        <i class="fas fa-search"></i>
      </button>
      <button className="header-btn">
        <i className="far fa-heart"></i>
      </button>
      <CartButton />
      <CustomerMenu />
    </div>
  );
};

const MobileNavBarBtn = () => {
  const dispatch = useDispatch();
  const sideBarOpened = useSelector((state) => state.ui.mobileSideBarOpened);

  return (
    <button
      id="m-nav-drawer-btn"
      className="header-btn nav-drawer-btn"
      onClick={() => dispatch(toggleMobileSideBar())}
    >
      {sideBarOpened ? (
        <i className="fas fa-times"></i>
      ) : (
          <i className="fas fa-bars"></i>
        )}
    </button>
  );
};

export const Header = () => {
  return (
    <div className="header-wrap flex">
      <MobileNavBarBtn />
      <Logo />
      <SearchBox />

      <HeaderButtonGroup />
    </div>
  );
};
