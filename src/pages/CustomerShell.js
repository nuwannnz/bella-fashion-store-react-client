import React, { Component } from "react";
import { Header } from "../components/Header";
import "../styles/CustomerShell.css";

export default class CustomerShell extends Component {
  render() {
    return (
      <div className="customer-shell flex flex-r">
        {/* Category bar, this is not always visible */}
        <div className="category-wrap"></div>

        {/* Main content wrap */}
        <div className="content-wrap flex flex-c">
          {/* Header */}
          <Header />

          {/* Page content */}
          <div className="page-content-wrap">
            <div className="page"></div>

            {/* Footer */}
            <div className="footer-wrap"></div>
          </div>
        </div>
      </div>
    );
  }
}
