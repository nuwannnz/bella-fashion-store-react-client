import React, { Component, useEffect } from "react";
import SingleProduct from "../../components/customer/SingleProduct";
import OffersSlider from "../../components/customer/OffersSlider";
import { useDispatch } from "react-redux";
import {
  productLoadedByIDAsync,
  productsLoadedAsync,
} from "../../redux/actions/admin-panel/product.actions";
import { useParams } from "react-router-dom";
import SliderOffers from "../../components/customer/SliderOffers";

export default function ProductPage() {
  const dispatch = useDispatch();

  let { productId } = useParams();



  useEffect(() => {
    dispatch(productsLoadedAsync());
    console.log(productId)
  }, []);

  return (
    <div className="container-fluid">
      <SingleProduct productId = {productId}/>
      <br />
      <SliderOffers />
    </div>
  );
}
