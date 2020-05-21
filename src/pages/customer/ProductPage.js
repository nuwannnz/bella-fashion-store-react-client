import React, { Component, useEffect } from "react";
import SingleProduct from "../../components/customer/SingleProduct";
import OffersSlider from "../../components/customer/OffersSlider";
import { useDispatch } from "react-redux";
import {
  productLoadedByIDAsync,
  productsLoadedAsync,
} from "../../redux/actions/admin-panel/product.actions";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const dispatch = useDispatch();

  let { productId } = useParams();

  console.log(productId)

  useEffect(() => {
    dispatch(productsLoadedAsync());
  }, []);

  return (
    <div className="container-fluid">
      <SingleProduct productId = {productId}/>
      <OffersSlider />
    </div>
  );
}
