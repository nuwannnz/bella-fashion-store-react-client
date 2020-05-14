import React from "react";
import "./styles/AppShell.css";
import { Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { adminPanelStore, customerStore } from "./redux/store";
import { ROUTE_PATHS } from "./constants";
import AdminPanelShell from "./pages/admin-panel/AdminPanelShell";
import CustomerShell from "./pages/customer/CustomerShell";
import LoadingAnimation from "./components/common/LoadingAnimation";
import { history } from "./helpers/navigation.helper";

<<<<<<< HEAD



=======
>>>>>>> 0a32cacffb0bf362a5238e5eb7efdb21bea55a6e
function AppShell() {
  return (
    <div className="app-wrap flex flex-r">
      <Router history={history}>
        <Switch>
          <Route path={ROUTE_PATHS.ADMIN_SHELL}>
            <Provider store={adminPanelStore}>
              <AdminPanelShell />
              <LoadingAnimation />
            </Provider>
          </Route>

<<<<<<< HEAD

          {/*<LoginForm />*/}
=======
          {/* <LoginForm /> */}
>>>>>>> 0a32cacffb0bf362a5238e5eb7efdb21bea55a6e

          <Route path={ROUTE_PATHS.CUSTOMER_SHELL}>
            <Provider store={customerStore}>
              <CustomerShell />
              <LoadingAnimation />
            </Provider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default AppShell;
