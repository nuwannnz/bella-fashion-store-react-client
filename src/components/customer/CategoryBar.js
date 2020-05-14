import React, { useState, useEffect } from "react";
import "../../styles/CategoryBar.css";

const SubCategoryBtn = ({ index, subCategory, onClick, selected }) => {
  return (
    <div
      onClick={() => onClick(index)}
      className={`sub-category-btn ${selected && "selected"}`}
    >
      {subCategory.name}
    </div>
  );
};

const CategoryButton = ({
  index,
  category,
  onClickCategory,
  onClickSubCategory,
  selected,
}) => {
  const [selectedSubCatIndex, setSelectedSubCatIndex] = useState(-1);

  const onSubCatClick = (subCatIndex) => {
    setSelectedSubCatIndex(subCatIndex);
    onClickSubCategory(subCatIndex);
  };

  useEffect(() => {
    if (!selected) {
      setSelectedSubCatIndex(-1);
    }
  }, [selected]);

  return (
    <div
      className={`category-btn ${selected && "selected"}`}
      onClick={() => onClickCategory(index)}
    >
      <span>{category.name}</span>

      <div className={`sub-category-list`}>
        {category.subCategories.map((s, i, a) => (
          <SubCategoryBtn
            key={i}
            index={i}
            subCategory={s}
            selected={selectedSubCatIndex === i}
            onClick={onSubCatClick}
          />
        ))}
      </div>
    </div>
  );
};

export default function CategoryBar() {
  const [categories, setCategories] = useState([
    {
      name: "women",
      subCategories: [
        { name: "Jeans" },
        { name: "Blouse" },
        { name: "T-Shirt" },
      ],
    },
    {
      name: "men",
      subCategories: [
        { name: "Trousers" },
        { name: "Shirt" },
        { name: "T-Shirt" },
        { name: "Short" },
      ],
    },
    {
      name: "kids",
      subCategories: [
        { name: "Froks" },
        { name: "Skirts" },
        { name: "T-Shirt" },
      ],
    },
    {
      name: "sports",
      subCategories: [
        { name: "Shoes" },
        { name: "Socks" },
        { name: "T-Shirts" },
      ],
    },
  ]);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);
  const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(-1);

  return (
    <div className="category-bar">
      <div className="category-list">
        {categories.map((category, i, a) => (
          <CategoryButton
            key={i}
            index={i}
            category={category}
            selected={selectedCategoryIndex === i}
            onClickCategory={(categoryIndex) => {
              setSelectedCategoryIndex(categoryIndex);
            }}
            onClickSubCategory={(subCatIndex) =>
              setSelectedSubCategoryIndex(subCatIndex)
            }
          />
        ))}
      </div>
    </div>
  );
}
