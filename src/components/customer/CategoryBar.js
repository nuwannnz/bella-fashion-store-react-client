import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { categoriesAsync } from '../../redux/actions/customer/customer.category.actions'
import "../../styles/CategoryBar.css";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import { normalizeString } from "../../helpers/input-validation.helper";

const SubCategoryBtn = ({ index, parentCategoryName, subCategory, onClick, selected }) => {
  return (
    <Link to={`${ROUTE_PATHS.CUSTOMER_PRODUCT_CATEGORY}/${normalizeString(parentCategoryName)}/${normalizeString(subCategory.name)}`} >
      <div
        onClick={() => onClick(index)}
        className={`sub-category-btn ${selected && "selected"}`}
      >
        {subCategory.name}
      </div>
    </Link>
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
    <Link to={`${ROUTE_PATHS.CUSTOMER_PRODUCT_CATEGORY}/${normalizeString(category.name)}`}>
      <div
        className={`category-btn ${selected && "selected"}`}
        onClick={() => onClickCategory(index)}
      >
        <span>{category.name}</span>

        <div className={`sub-category-list`}>
          {category.subcategory.map((s, i, a) => (
            <SubCategoryBtn
              key={i}
              index={i}
              subCategory={s}
              parentCategoryName={category.name}
              selected={selectedSubCatIndex === i}
              onClick={onSubCatClick}
            />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default function CategoryBar() {

  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.categories);


  useEffect(() => {
    dispatch(categoriesAsync());

  }, [])

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);
  const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(-1);

  return (
    <div className="category-bar">
      <div className="category-list">
        {categories && categories.map((category, i, a) => (
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
