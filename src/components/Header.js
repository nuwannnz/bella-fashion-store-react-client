import React from "react";
import "../styles/Header.css";
import { getAssetUrl } from "../helpers/assets.helper";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileSideBar } from "../redux/actions/ui.actions";

const Logo = () => (
  <div className="logo-wrap flex-center">
    <div className="logo">
      <img src={getAssetUrl("/logo/logo-text-accent.png")} alt="logo" />
    </div>
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
        <i class="fas fa-search" onKeyUp={handleKeyUp}></i>
      </span>
    </div>
  );
};

const CustomerMenu = () => {
  return (
    <div className="customer-menu">
      <div className="customer-avatar">
        <span>Login</span>
      </div>
    </div>
  );
};

const HeaderButtonGroup = () => {
  return (
    <div className="header-btn-group flex">
      <button id="m-search-btn" className="header-btn">
        <i class="fas fa-search"></i>
      </button>
      <button className="header-btn">
        <i class="far fa-heart"></i>
      </button>
      <button className="header-btn">
        <i class="fas fa-shopping-basket"></i>
      </button>
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
        <i class="fas fa-times"></i>
      ) : (
        <i class="fas fa-bars"></i>
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
