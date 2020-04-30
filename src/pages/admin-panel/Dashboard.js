import React from "react";
import '../../styles/admin/Dashboard.css';
import SideBar from "../../components/admin/dashboard/SideBar";
import HeaderBar from "../../components/admin/dashboard/HeaderBar";

export default function Dashboard() {
  return (
    <div className="dashboard-root flex">
      <div className="side-bar-wrap">
        <SideBar />
      </div>
      <div className="main-content-wrapper flex flex-c w-100 h-100">
        <div className="header-wrapper w-100">
          <HeaderBar />
        </div>

        <div className="content-wrapper">
          <div className="content">

          </div>
        </div>
      </div>
    </div>
  );
}
