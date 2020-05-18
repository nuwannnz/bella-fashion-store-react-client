import React, { useState, useEffect } from "react";
import TabHeader from "../../../components/common/TabHeader";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../../components/admin/ProductList";
import BrandList from "../../../components/admin/BrandList";
import AdminProductPage from "./AdminProductPage";
import AdminBrandPage from "./AdminBrandPage";

const tabHeaders = ["Products", "Brands"];

export default function ProductDashboardPage() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <div className="dashboard-page">
      <div className="page-content">
        <h1 className="page-title">Product Management</h1>

        <TabHeader
          tabItems={tabHeaders}
          onTabItemClick={(i) => {
            setSelectedTabIndex(i);
          }}
        />

        {selectedTabIndex === 0 && <AdminProductPage />}

        {selectedTabIndex === 1 && <AdminBrandPage />}
      </div>
    </div>
  );
}
