import React, { useState } from "react";
import "../../styles/common/SelectBox.css";
import { capitalizeString } from "../../helpers/string.helper";

export default function SelectBox({
  title,
  optionValues,
  onItemSelected,
  placeholder = "Select an item",
  selectedItem = "default",
}) {
  const [selected, setSelected] = useState(selectedItem);

  const handleItemSelected = (e) => {
    setSelected(e.target.value);
    if (parseInt(e.target.value) === -1) {
      return;
    }
    if (onItemSelected) {
      onItemSelected(e.target.value);
    }
  };

  return (
    <div className="select-box">
      <label>{title}</label>
      <select onChange={handleItemSelected} value={selected}>
        <option className="default-option" value="-1">
          {capitalizeString(placeholder)}
        </option>
        {optionValues.map((value, i, a) => (
          <option key={i} value={value}>
            {capitalizeString(value, true)}
          </option>
        ))}
      </select>
    </div>
  );
}
