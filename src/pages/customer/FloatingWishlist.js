import React, { useState, useEffect } from 'react';
import '../../styles/customer/FloatingWishlist.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlistBar, toggleDisplayCart } from '../../redux/actions/ui.actions';

const WishlistItem = ({ product, qty }) => {
    return (
        <div className="wishlist-item">
            <div className="wishlist-item-image">
                <img src={product.images[0]} alt='product images' />
            </div>
            <div className="wishlist-item-info">
                <div className="flex align-items-center">

                    <span className="product-qty"> {`${qty}`}</span>
                   
                    <div>

                        <span className="product-name-span" >{`${product.name} (${qty})`}</span>

                    </div>
                </div>

                <span className="product-price">LKR {product.price}</span>
            </div>
        </div>
    )
}

const WishlistContent = ({ items }) => {
    return(
        <div className="wishlist-content-wrap">
            <div className="wishlist-item-list">
                {
                    items.map((item, i) => <WishlistItem key={i} {...item} />)
                }
            </div>
        </div>
    )
}

const WishlistFooter = ({ cartClickHandler }) => {
    const dispatch = useDispatch();

    const handleCartClick = () => {
        dispatch(toggleWishlistBar());
        dispatch(toggleDisplayCart());
    }

    return(
        <div className="wishlist-footer">
            <div className="wishlist-footer-content">
                <button className="cart-btn" onClick={handleCartClick}>
                    <span>Cart</span>
                    <span> <i class="fas fa-arrow-right"></i></span>
                </button>
            </div>
        </div>
    )
}

export default function FloatingWishlist() {
    const dispatch = useDispatch();
    const wishlistBarOpened = useSelector(state => state.ui.wishlistBarOpened);
    const { items } = useSelector((state) => state.wishlist);

    const handleWishlistCloseBtnClick = () => {
        dispatch(toggleWishlistBar());
    }

    const handleClickOnFloatingOverlay = () => {
        dispatch(toggleWishlistBar());
    }

    return(
        <div>
            {
                wishlistBarOpened && <div className="floating-overlay" onClick={handleClickOnFloatingOverlay} ></div>
            }

            <div className={`floating-wishlist-wrap ${!wishlistBarOpened && 'closed'}`}>
                <div className="floating-cart">

                    <div className="floating-wishlist-window">
                        <div className="wishlist-header flex">
                            <h1>My Wishlist</h1>
                            <button className="close-wishlist-btn" onClick={handleWishlistCloseBtnClick} >
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>

                        <WishlistContent items={items} />

                        <WishlistFooter />

                    </div>
                </div>
            </div>
        </div>
    )
}