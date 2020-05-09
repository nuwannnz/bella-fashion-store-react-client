import React, { useState } from "react";
import TabHeader from "../../../components/common/TabHeader";

const tabHeaders = ["Users", "Roles"];

export default function UserDashboardPage() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <div className="dashboard-page">
      <div className="page-content">
        <h1 className="page-title">User Management</h1>

        <TabHeader
          tabItems={tabHeaders}
          onTabItemClick={(i) => {
            setSelectedTabIndex(i);
          }}
        />

        {selectedTabIndex === 0 && (
          <div className="tab-page">
            <div className="card card-inline">
              <h4>Nuwan Karunarathna</h4>
              <span>Admin</span>
            </div>
          </div>
        )}

        {selectedTabIndex === 1 && (
          <div className="tab-page">
            <h3>Roles</h3>
          </div>
        )}
      </div>
    </div>
  );
}
