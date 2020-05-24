import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import { addProductToCartAsync } from "../../redux/actions/customer/cart.actions";
import AccentButton from "../common/AccentButton";
import { displayToastAsync } from "../../redux/actions/toast.actions";
import { buildNotification, NOTIFICATION_TYPE } from "../../services/customer/notification.service";

export default function AddToCartButton({ productId, size, qty, onAddToCart, expandedMode = true }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.customer);
  const history = useHistory();

  const onClickHandler = () => {

    if (onAddToCart) {
      onAddToCart()
    }
    // if only product id is given navigate to the product page
    if (!size || !qty) {
      if (expandedMode) {
        dispatch(displayToastAsync(buildNotification("Please select a size and a quantity before adding to cart", NOTIFICATION_TYPE.ERROR)))
        return;
      } else {

        history.push(`${ROUTE_PATHS.CUSTOMER_PRODUCT}/${productId}`);
        return;
      }
    }

    // dispatch action to add to cart
    if (!token) {
      // user not logged in
      // redirect to login page
      history.push(ROUTE_PATHS.CUSTOMER_LOGIN);
      return;
    }

    dispatch(addProductToCartAsync(productId, size, parseInt(qty)));
  };

  return (
    expandedMode ? (
      <div style={{ width: '150px', margin: '10px 0px' }}>

        <AccentButton onButtonClick={onClickHandler}>
          <>
            <span>
              <i class="fas fa-shopping-cart mr-2"></i>
          Add to Cart
        </span>
          </>
        </AccentButton>
      </div>
    ) :
      (< button className="add-to-cart-btn" onClick={onClickHandler} >
        <i class="fas fa-shopping-cart"></i>
      </button >)

  );
}
