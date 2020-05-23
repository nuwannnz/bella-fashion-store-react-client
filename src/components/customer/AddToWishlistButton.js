import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import { addProductToWishlistAsync } from "../../redux/actions/customer/wishlist.action";

export default function AddToWishlistButton( { productId }) {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.customer);
    const history = useHistory();

    const onClickHandler = () => {
        if(!token) {
            history.push(ROUTE_PATHS.CUSTOMER_LOGIN);
            return;
        }
        dispatch(addProductToWishlistAsync(productId));
    };
    return(
        <button className="wishlist-btn" onClick={onClickHandler}>
            <i class="on-hover fas fa-heart"></i>
            <i class="default far fa-heart"></i>
        </button>
    );
}