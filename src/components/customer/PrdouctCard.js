import React from 'react'
import '../../styles/offers.css'
import { Route, Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constants';
import ProductPage from '../../pages/customer/ProductPage';

export default function PrdouctCard({id,name,price,totPrice,image}) {
   

        return (
            <div>
                <Link to={`${ROUTE_PATHS.CUSTOMER_PRODUCT}/${id}`} >
                <div className="category-card"> 
                    <img className="card-img" src= {image} alt={image}></img> <hr style={{height: '3px'}} />
                    <div className="slider-overlay">
                        <div className="slider-text">View</div>
                    </div>
                    <h5>{name}</h5><hr />
                    <h6 className="card-price">LKR. <s>{price}</s> {totPrice}</h6>
                </div>
                </Link>
                
            </div>
        )
    
}
