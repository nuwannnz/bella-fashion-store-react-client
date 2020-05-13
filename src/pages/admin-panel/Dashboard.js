import React, { useState, useEffect } from "react";
import '../../styles/admin/Dashboard.css';
import SideBar from "../../components/admin/dashboard/SideBar";
import HeaderBar from "../../components/admin/dashboard/HeaderBar";
import { Switch, Route, Redirect } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import UserDashboard from "./UserDashboard";
import OrderDashboard from "./OrderDashboard";
import { useDispatch } from "react-redux";
import { getAdminPanelMenuItems } from "../../helpers/menu.helper";
import { useUserRole, useAuthUser } from "../../hooks/admin-panel/Auth.hooks";
import { uiIsLoading } from "../../redux/actions/ui.actions";
import ProductDashboardPage from "./product/AdminProductPage";

export default function Dashboard() {

  const dispatch = useDispatch();

  const userRole = useUserRole()
  const authedUser = useAuthUser();


  const [menuItems, setMenuItems] = useState([])


  useEffect(() => {
    console.log('dashboard page');
    if (userRole) {

      const menuItemList = getAdminPanelMenuItems(userRole.permissions);
      if (menuItemList) {
        setMenuItems(menuItemList);
      }

      dispatch(uiIsLoading(false));
    }
  }, [userRole])

  return (


    authedUser && authedUser.isNew ? (
      <Redirect to={ROUTE_PATHS.ADMIN_UPDATE_TEMP_PWD} />
    ) : (


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

                <Route path={ROUTE_PATHS.ADIMN_DASHBOARD_PRODUCT}>
                  <ProductDashboardPage />
                </Route>
              </Switch>
            </div>
          </div>
        </div >
      )
  )

}
