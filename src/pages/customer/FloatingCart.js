import React, { useState, useEffect } from 'react'
import '../../styles/FloatingCart.css';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCartBar, toggleDisplayCheckout } from '../../redux/actions/ui.actions';
import { removeProductFromCartAsync } from "../../redux/actions/customer/cart.actions";


export const CartItem = ({ product, size, qty }) => {
    const dispatch = useDispatch();
    return (
        <div className="cart-item">
            <span className="delete-cart-item-btn" onClick={() => dispatch(removeProductFromCartAsync(product._id, size))}>
                <i className="far fa-trash-alt"></i>
            </span>
            <div className="cart-item-image">
                <img src={product.images[0]} alt='product images' />
            </div>
            <div className="cart-item-info">
                <div className="flex align-items-center">

                    <span className="product-qty"> {`${qty}`}</span>
                    <span style={{ fontWeight: '500' }} >x</span>
                    <div>

                        <span className="product-name-span" >{`${product.name} (${size})`}</span>

                    </div>
                </div>

                <span className="product-price">LKR {product.price}</span>
            </div>
        </div>
    )
}


const CartContent = ({ items }) => {




    return (
        <div className="cart-content-wrap">
            <div className="cart-item-list">
                {
                    items.map((item, i) => <CartItem key={i} {...item} />)
                }
            </div>
        </div>
    )
}


const CartFooter = ({ totalPrice, checkoutClickHandler }) => {

    const dispatch = useDispatch();

    const handleCheckoutClick = () => {
        dispatch(toggleCartBar())
        dispatch(toggleDisplayCheckout());
    }

    return (
        <div className="cart-footer">
            <div className="cart-footer-content">

                <div className="price-info-wrapper">
                    <div className="price-info">
                        <span style={{ color: '#555' }} >Total: </span>
                        <span className="total">LKR {totalPrice}</span>
                    </div>
                </div>

                <button className="checkout-btn" onClick={handleCheckoutClick}>
                    <span>Checkout</span>
                    <span> <i class="fas fa-arrow-right"></i></span>
                </button>
            </div>
        </div>
    )
}


export default function FloatingCart() {

    const dispatch = useDispatch();
    const cartBarOpened = useSelector(state => state.ui.cartBarOpened);
    const { items } = useSelector((state) => state.cart);

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        let calculatedTotalPrice = 0;
        items.forEach(item => {
            calculatedTotalPrice += parseInt(item.qty) * parseFloat(item.product.price)
        })
        setTotalPrice(calculatedTotalPrice);
    }, [items])

    const handleCartCloseBtnClick = () => {
        dispatch(toggleCartBar());
    }

    const handleClickOnFloatingOverlay = () => {
        dispatch(toggleCartBar());

    }

    return (
        <div>
            {
                cartBarOpened && <div className="floating-overlay" onClick={handleClickOnFloatingOverlay} ></div>
            }

            <div className={`floating-cart-wrap ${!cartBarOpened && 'closed'}`}>
                <div className="floating-cart">

                    <div className="floating-cart-window">
                        <div className="cart-header flex">
                            <h1>My Cart</h1>
                            <button className="close-cart-btn" onClick={handleCartCloseBtnClick} >
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>

                        <CartContent items={items} />

                        <CartFooter totalPrice={totalPrice} />

                    </div>
                </div>
            </div>
        </div>
    )
}
