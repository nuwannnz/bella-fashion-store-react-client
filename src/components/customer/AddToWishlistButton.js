import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants";
import { addProductToWishlistAsync } from "../../redux/actions/customer/wishlist.action";
import { displayToastAsync } from "../../redux/actions/toast.actions";
import { buildNotification, NOTIFICATION_TYPE } from "../../services/customer/notification.service";

export default function AddToWishlistButton({ productId }) {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.customer);
    const { items } = useSelector((state) => state.wishlist);
    const history = useHistory();

    const isProductInWishlistAlready = useMemo(() => {
        const productIds = items.map(i => i.product._id);
        return productIds.includes(productId);
    }, [productId, items])

    const onClickHandler = () => {
        if (!token) {
            history.push(ROUTE_PATHS.CUSTOMER_LOGIN);
            return;
        }
        if (isProductInWishlistAlready) {
            dispatch(displayToastAsync(buildNotification("Product is already in the wishlist", NOTIFICATION_TYPE.ERROR)))
            return;
        }
        dispatch(addProductToWishlistAsync(productId));
    };
    return (
        <button className="wishlist-btn" onClick={onClickHandler}>
            <i class="on-hover fas fa-heart"></i>
            <i class="default far fa-heart"></i>
        </button>
    );
}