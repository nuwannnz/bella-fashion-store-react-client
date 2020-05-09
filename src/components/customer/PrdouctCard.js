import React from 'react'
import '../../styles/offers.css'

export default function PrdouctCard(props) {
    const name = props.name;
    const price = props.price;
    
        return (
            <div>

<div className="category-card">
          
          <img src= {require('../../assets/shirt.jpg')}></img>
        
          <h5>{name}</h5>
          <h6>{price}</h6>
      </div>
                
            </div>
        )
    
}
