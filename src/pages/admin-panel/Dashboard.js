import React, { useState, useEffect } from "react";
import '../../styles/admin/Dashboard.css';
import SideBar from "../../components/admin/dashboard/SideBar";
import HeaderBar from "../../components/admin/dashboard/HeaderBar";
import { Switch, Route } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import UserDashboard from "./UserDashboard";
import OrderDashboard from "./OrderDashboard";
import { useSelector } from "react-redux";
import { getAdminPanelMenuItems } from "../../helpers/menu.helper";
import { useUserRole } from "../../hooks/admin-panel/Auth.hooks";

export default function Dashboard() {

  const userRole = useUserRole()

  const [menuItems, setMenuItems] = useState([])


  useEffect(() => {

    if (userRole) {

      const menuItemList = getAdminPanelMenuItems(userRole.permissions);
      if (menuItemList) {
        setMenuItems(menuItemList);
      }
    }
  }, [userRole])

  return (
    <div className="dashboard-root flex">
      {/* <div className="side-bar-wrap"> */}
      <SideBar menuItems={menuItems} />
      {/* </div> */}
      <div className="main-content-wrapper flex flex-c w-100 h-100">
        <div className="header-wrapper w-100">
          <HeaderBar />
        </div>

        <div className="content-wrapper">
          {/* <div className="content">

          </div> */}

          <Switch>
            <Route path={ROUTE_PATHS.ADIMN_DASHBOARD_USER} >
              <UserDashboard />
            </Route>

            <Route path={ROUTE_PATHS.ADIMN_DASHBOARD_ORDER}>
              <OrderDashboard />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
