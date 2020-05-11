import React from 'react'
import '../../styles/offers.css'

export default function PrdouctCard(props) {
    const name = props.name;
    const price = props.price;
    const totPrice = props.totalPrice;
    
        return (
            <div>

<div className="category-card">
          
          <img src= {require('../../assets/shirt.jpg')}></img>
        
          <h5>{name}</h5>
          <h6>LKR. <s>{price}</s> {totPrice}</h6>
      </div>
                
            </div>
        )
    
}
