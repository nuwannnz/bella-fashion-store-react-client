import React, { useState } from "react";
import TabHeader from "../../../components/common/TabHeader";
import UserSection from "./UserSection";
import RoleSection from "./RoleSection";

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

        {selectedTabIndex === 0 && <UserSection />}

        {selectedTabIndex === 1 && <RoleSection />}
      </div>
    </div>
  );
}
