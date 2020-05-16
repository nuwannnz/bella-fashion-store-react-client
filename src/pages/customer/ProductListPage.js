import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { productsLoadedAsync } from "../../redux/actions/customer/product.actions";
import '../../styles/ProductListPage.css'
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constants';
import AddToCartButton from '../../components/customer/AddToCartButton';


const ProductInfoCard = ({ product }) => {
    return (
        <div className="product-info-card">
            <button className="wishlist-btn" >
                <i class="on-hover fas fa-heart"></i>
                <i class="default far fa-heart"></i>
            </button>
            <div className="add-to-cart-btn-wrap">

                {/* IMPORTANT TODO: 
                    In here the size and qty is only given for testing, remove them in production   
                    */}
                <AddToCartButton productId={product._id} size="S" qty={2} />

            </div>

            <Link to={`${ROUTE_PATHS.CUSTOMER_PRODUCT}/${product._id}`} className="product-card-link">
                <div className="product-image-wrapper">
                    <img src={product.images[0]} alt={product.name} />
                </div>
                <div className="product-info-wrapper">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price" >LKR {product.price}</span>
                </div>
            </Link>
        </div>
    )
}


export default function ProductListPage() {

    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);

    // TODO: add category selection

    useEffect(() => {
        dispatch(productsLoadedAsync())
    })

    return (
        <div className="page" >
            <h1>Product list</h1>

            <div className="product-list-wrapper flex">

                {
                    products && products.map((p, i) => <ProductInfoCard key={i} product={p} />)
                }
            </div>
        </div>
    )
}
