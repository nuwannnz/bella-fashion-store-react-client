import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { getAssetUrl } from "../helpers/assets.helper";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileSideBar, toggleCartBar, toggleWishlistBar } from "../redux/actions/ui.actions";
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
    console.log(e);
    if (e.keyCode === 13) {
      // enter pressed
      onSearchSubmit(e.target.value);
    }
  };

  return (
    <div id="search-box" className="search-box-wrap">
      <input className="search-box" placeholder="Search for items and brands" onKeyUp={handleKeyUp} />
      <span className="search-icon">
        <i className="fas fa-search" ></i>
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

const WishlistButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const token = useSelector((state) => state.customer.token);

  const onWishlistBtnClick = () => {
    if (token === null) {
      // Customer is not logged in
      history.push(ROUTE_PATHS.CUSTOMER_LOGIN);
    }
    dispatch(toggleWishlistBar());
  }

  return (
    <button className="header-btn badge-btn" style={{ marginRight: "25px" }} onClick={onWishlistBtnClick}>
      <i className="far fa-heart"></i>
      {wishlistItems && (
        <span className="product-count-badge">{wishlistItems.length}</span>
      )}
    </button>
  )
}


const HeaderButtonGroup = () => {
  return (
    <div className="header-btn-group flex">
      <button id="m-search-btn" className="header-btn">
        <i class="fas fa-search"></i>
      </button>
      <WishlistButton />
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

  const history = useHistory();

  const handleOnSearchSubmit = (searchText) => {
    searchText = encodeURIComponent(searchText);
    history.push(`${ROUTE_PATHS.CUSTOMER_PRODUCT_SEARCH}?q=${searchText}`)
  }

  return (
    <div className="header-wrap flex">
      <MobileNavBarBtn />
      <Logo />
      <SearchBox onSearchSubmit={handleOnSearchSubmit} />

      <HeaderButtonGroup />
    </div>
  );
};
