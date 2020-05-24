import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsLoadedAsync } from "../../redux/actions/admin-panel/product.actions";
import "../../styles/offers.css";
import {ProductInfoCard} from "../../pages/customer/ProductListPage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function SliderOffers () {
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

  

  const settings = {
    dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
};

  useEffect(()=>{
    checkOffers()
    }, [])
   
        return (
          <div calssName="offers-container" style={{backgroundColor: '#F2EBFF', borderRadius: '1em'}}>
            <h1 style={{textAlign: 'center', fontStyle: 'italic', fontFamily: 'cursive', color: '#8c52ff'}}>Offers Available At Bella Fashion</h1>
            <Slider {...settings}>
              {checkOffers()}
            {obj.map((product) => (
          <div>
            <ProductInfoCard product = {product} />
          </div>
            ))}
          </Slider>
          </div>
        )
    
}
