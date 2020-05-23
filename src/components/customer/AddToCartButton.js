import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import { addProductToCartAsync } from "../../redux/actions/customer/cart.actions";

export default function AddToCartButton({ productId, size, qty, onAddToCart }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.customer);
  const history = useHistory();

  const onClickHandler = () => {

    if(onAddToCart){
      onAddToCart()
    }
    // if only product id is given navigate to the product page
    if (!size || !qty) {
      history.push(`${ROUTE_PATHS.CUSTOMER_PRODUCT}/${productId}`);
      return;
    }

    // dispatch action to add to cart
    if (!token) {
      // user not logged in
      // redirect to login page
      history.push(ROUTE_PATHS.CUSTOMER_LOGIN);
      return;
    }

    dispatch(addProductToCartAsync(productId, size, qty));
  };

  return (
    <button className="add-to-cart-btn" onClick={onClickHandler} >
      <i class="fas fa-shopping-cart"></i>
    </button>
  );
}
