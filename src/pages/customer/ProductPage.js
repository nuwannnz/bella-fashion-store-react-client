import React, { Component, useEffect } from "react";
import SingleProduct from "../../components/customer/SingleProduct";
import OffersSlider from "../../components/customer/OffersSlider";
import { useDispatch } from "react-redux";
import {
  productLoadedByIDAsync,
  productsLoadedAsync,
} from "../../redux/actions/admin-panel/product.actions";

export default function ProductPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsLoadedAsync());
  }, []);

  return (
    <div className="container">
      <SingleProduct />
      <OffersSlider />
    </div>
  );
}
