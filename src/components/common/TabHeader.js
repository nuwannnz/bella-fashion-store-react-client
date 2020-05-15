import React, { useState } from "react";
import "../../styles/common/TabHeader.css";

const TabHeaderItem = ({ index, tabItem, clickHandler, selected = false }) => {
  return (
    <div
      className={`tab-header-item ${selected && "selected"}`}
      onClick={() => clickHandler(index)}
    >
      <span>{tabItem}</span>
    </div>
  );
};

export default function TabHeader({ tabItems, onTabItemClick = null }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabItemClick = (index) => {
    setSelectedIndex(index);
    if (onTabItemClick !== null) {
      onTabItemClick(index);
    }
  };
  return (
    <div className="tab-header">
      {tabItems.map((tabItem, i, a) => (
        <TabHeaderItem
          key={i}
          index={i}
          tabItem={tabItem}
          clickHandler={handleTabItemClick}
          selected={i === selectedIndex}
        />
      ))}
    </div>
  );
}
