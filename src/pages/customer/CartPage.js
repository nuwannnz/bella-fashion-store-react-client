import React from "react";
import { useSelector } from "react-redux";

const CartItem = ({ product, size, qty }) => {
  return (
    <div className="flex">
      <div>{product.name}</div>

      <div>{size}</div>

      <div>{qty}</div>
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
