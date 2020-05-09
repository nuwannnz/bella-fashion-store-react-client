import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactCardCarousel from 'react-card-carousel';
import ItemsCarousel from 'react-items-carousel';
import { productsLoadedAsync } from '../../redux/actions/admin-panel/product.actions';
import '../../styles/offers.css'
import PrdouctCard from './PrdouctCard';


export default function OffersSlider() {

  const dispatch = useDispatch();


  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;

  useEffect(() => {
    
    dispatch(productsLoadedAsync());
  });

  const products = useSelector(state => state.product.products);

  const offers = false;

  const obj = new Array();

  const checkOffers = () => {
    products.map(pro => (
      <div>
        {seeOffers(pro.product_discount) ? obj.push(pro) : 'null'}
      </div>
    ))
  }
const seeOffers = (offer) => {
  
 

  if (offer > 0) {
    return true 
  } else
    return false;

}
  
  
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      {checkOffers()}
      
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={3}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {
            obj.map(product => (
            <div>
              
        <PrdouctCard name = {product.product_name}
           price = {product.product_price}/> 
              
           </div>
            ))

        }
      </ItemsCarousel>
    </div>
  );
};