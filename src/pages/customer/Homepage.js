import React from "react";
import { Header } from "../../components/Header";

import "../../styles/CustomerShell.css";
import CategoryBar from "../../components/customer/CategoryBar";
import { useSelector } from "react-redux";

export default function Homepage() {
  const sideBarOpened = useSelector((state) => state.ui.mobileSideBarOpened);

  return (
    <div className="customer-shell flex flex-r">
      <div className="w-100 flex flex-c">
        <Header />

        <div className="content-wrap flex">
          <div
            className={`category-wrap ${sideBarOpened ? "opened" : "closed"}`}
          >
            <CategoryBar />
          </div>

          <div className="page-content-wrap">
            <div className="page"></div>

            <div className="footer-wrap"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
