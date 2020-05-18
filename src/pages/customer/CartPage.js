import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProductFromCartAsync } from "../../redux/actions/customer/cart.actions";

const CartItem = ({ product, size, qty }) => {
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeProductFromCartAsync(product._id, size));
  };

  return (
    <div className=" card flex">

      <div className>

        <div>

        </div>

        <div>Product: {product.name}</div>

        <div>Size: {size}</div>

        <div>Quantity: {qty}</div>

      </div>

      <div>
        <button onClick={handleRemoveClick}>remove</button>
      </div>
    </div>
  );
};

export default function CartPage() {
  const { products } = useSelector((state) => state.cart);
  return (
    <div>
      <h2>Cart</h2>

      {products.length === 0 && <h3>No products in the cart</h3>}
      <div>
        {products.map((p) => (
          <CartItem product={p.product} size={p.size} qty={p.qty} />
        ))}
      </div>
    </div>
  );
}
