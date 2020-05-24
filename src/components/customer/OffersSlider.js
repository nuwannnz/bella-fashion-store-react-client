import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemsCarousel from "react-items-carousel";

import { productsLoadedAsync } from "../../redux/actions/admin-panel/product.actions";
import "../../styles/offers.css";
import {ProductInfoCard} from "../../pages/customer/ProductListPage";

export default function OffersSlider() {
  const dispatch = useDispatch();

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  useEffect(() => {
    dispatch(productsLoadedAsync());
  }, []);

  const products = useSelector((state) => state.product.products);

  const offers = false;

  const obj = new Array();

  const checkOffers = () => {
    products.map((pro) => (
      <div>{seeOffers(pro.discount) ? obj.push(pro) : "null"}</div>
    ));
  };
  const seeOffers = (offer) => {
    if (offer > 0) {
      return true;
    } else return false;
  };

  const totalPrice = (discount, price) => {
    return price - discount;
  };

  

  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      {checkOffers()}

      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={20}
        leftChevron={<button className="slider-btn"><i className="fa fa-arrow-left"></i></button>}
        rightChevron={<button className="slider-btn"><i className="fa fa-arrow-right"></i></button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {obj.map((product) => (
          <div>

            <ProductInfoCard product = {product} />
          </div>
        ))}
      </ItemsCarousel>
    </div>
  );
}
