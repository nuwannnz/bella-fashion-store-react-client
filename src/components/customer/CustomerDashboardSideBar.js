import React from "react";
import "../../styles/customer/DashboardSideBar.css";
import { ROUTE_PATHS } from "../../constants";
import { Link, NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { GrLocation, GrContactInfo } from "react-icons/gr";

const sideBarButtons = [
  { text: "Home", link: ROUTE_PATHS.CUSTOMER_SHELL, icon: FiHome },
  {
    text: "dashboard",
    link: ROUTE_PATHS.CUSTOMER_DASHBOARD,
    icon: MdDashboard,
  },
  {
    text: "orders",
    link: ROUTE_PATHS.CUSTOMER_DASHBOARD_ORDER,
    icon: RiFileList3Line,
  },
  {
    text: "addresses",
    link: ROUTE_PATHS.CUSTOMER_DASHBOARD_ADDRESS,
    icon: GrLocation,
  },
  {
    text: "my info",
    link: ROUTE_PATHS.CUSTOMER_DASHBOARD_ACCOUNT_INFO,
    icon: GrContactInfo,
  },
];

const SideBarButton = ({ text, link, Icon }) => {
  return (
    <NavLink
      exact={true}
      activeClassName="sidebar-btn-active"
      to={link}
      title={text}
    >
      <div className="sidebar-btn">
        <span>{text}</span>
        <Icon />
      </div>
    </NavLink>
  );
};

export default function CustomerDashboardSideBar() {
  return (
    <div className="dashboard-side-bar">
      {sideBarButtons.map((btn, i, a) => (
        <SideBarButton
          key={i}
          text={btn.text}
          link={btn.link}
          Icon={btn.icon}
        />
      ))}
    </div>
  );
}
