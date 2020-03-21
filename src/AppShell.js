import React from 'react';
import { Header } from "./components/Header";
import "./styles/AppShell.css";


function AppShell() {
  return (
    <div className="app-wrap flex flex-r">

      {/* Category bar, this is not always visible */}
      <div className="category-wrap" >

      </div>

      {/* Main content wrap */}
      <div className="content-wrap flex flex-c">

        {/* Header */}
        <Header />

        {/* Page content */}
        <div className="page-content-wrap">

          <div className="page">

          </div>

          {/* Footer */}
          <div className="footer-wrap">

          </div>
        </div>
      </div>
    </div>
  );
}

export default AppShell;
