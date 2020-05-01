import React from 'react'
import '../styles/categoryList.css'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom";



export default function CategoriesList({image,name,price}) {
    return (
        <>
        <div className="category-card"> 
            <Link to="game">
                <img src={image}></img>
            </Link>
            <h5>{name}</h5>
            <h6>{price}</h6>
        </div>
        </>
        );
    
}
