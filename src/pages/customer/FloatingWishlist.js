import React, { useState, useEffect } from "react";
import "../../styles/customer/FloatingWishlist.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlistBar } from "../../redux/actions/ui.actions";
import { removeProductFromWishlistAsync } from "../../redux/actions/customer/wishlist.action";
import AddToCartButton from "../../components/customer/AddToCartButton";
import { closePopup } from "../../redux/actions/popup.actions";

const WishlistItem = ({ product, size, qty }) => {
  const dispatch = useDispatch();
  const [hasStock, setHasStock] = useState(false);

  useEffect(() => {
    let qty = 0;

    product.sizeQty.forEach((s) => (qty += parseInt(s.qty)));
    setHasStock(qty > 0);
  }, []);

  return (
    <div className="wishlist-item">
      <div className="cart-btn">
        <AddToCartButton
          productId={product._id}
          onAddToCart={() => {
            dispatch(toggleWishlistBar());
          }}
        />
      </div>

      <div className="wishlist-item-image">
        <img src={product.images[0]} alt="product images" />
      </div>
      <div className="wishlist-item-info">
        <div className="flex align-items-center">
          <span className="product-qty">
            {hasStock ? "In Stock" : "Out of Stock"}
          </span>
          <div>
            <span className="product-name-span">{`${product.name} `}</span>
          </div>
        </div>

        <span className="product-price">LKR {product.price}</span>
      </div>
      <span
        className="delete-wishlist-item-btn"
        onClick={() => dispatch(removeProductFromWishlistAsync(product._id))}
      >
        <i className="far fa-trash-alt"></i>
      </span>
    </div>
  );
};

const WishlistContent = ({ items }) => {
  return (
    <div className="wishlist-content-wrap">
      <div className="wishlist-item-list">
        {items && items.map((item, i) => <WishlistItem key={i} {...item} />)}
      </div>
    </div>
  );
};

export default function FloatingWishlist() {
  const dispatch = useDispatch();
  const wishlistBarOpened = useSelector((state) => state.ui.wishlistBarOpened);
  const { items } = useSelector((state) => state.wishlist);

  const handleWishlistCloseBtnClick = () => {
    dispatch(toggleWishlistBar());
  };

  const handleClickOnFloatingOverlay = () => {
    dispatch(toggleWishlistBar());
  };

  return (
    <div>
      {wishlistBarOpened && (
        <div
          className="floating-overlay"
          onClick={handleClickOnFloatingOverlay}
        ></div>
      )}

      <div
        className={`floating-wishlist-wrap ${!wishlistBarOpened && "closed"}`}
      >
        <div className="floating-wishlist">
          <div className="floating-wishlist-window">
            <div className="wishlist-header flex">
              <h1>My Wishlist</h1>
              <button
                className="close-wishlist-btn"
                onClick={handleWishlistCloseBtnClick}
              >
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>

            <WishlistContent items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
