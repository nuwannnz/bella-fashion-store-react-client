import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import { addProductToCartAsync } from "../../redux/actions/customer/cart.actions";

export default function AddToCartButton({ productId, size, qty }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.customer);
  const history = useHistory();

  const onClickHandler = () => {
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
    <button onClick={onClickHandler} disabled={!productId || !size || !qty}>
      Add to cart
    </button>
  );
}
