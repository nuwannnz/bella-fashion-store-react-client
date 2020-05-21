import { placeOrder } from "../../../services/customer/cart.service";
import { clearCartAsync } from "./cart.actions";
import { displayToastAsync } from "../toast.actions";
import { buildNotification, NOTIFICATION_TYPE } from "../../../services/customer/notification.service";

const ORDER_ACTION_TYPES = {
    ORDERS_LOADED: 'ORDERS_LOADED',
    ORDER_ADDED: 'ORDER_ADDED'
}


const orderAdded = (order) => ({
    type: ORDER_ACTION_TYPES.ORDER_ADDED,
    payload: order
})

const ordersLoaded = (orders) => ({
    type: ORDER_ACTION_TYPES.ORDERS_LOADED,
    payload: orders
})


export function placeOrderAsync(orderDto) {
    return async (dispatch, getState) => {
        const { token } = getState().customer;

        const result = await placeOrder(token, orderDto);
        if (result.isResultOk()) {
            dispatch(orderAdded(result.data))
            dispatch(clearCartAsync());
            dispatch(displayToastAsync(buildNotification("Placed your order successfully", NOTIFICATION_TYPE.SUCCESS)))

            return true;
        } else {
            dispatch(displayToastAsync(buildNotification("Failed to create order. Please try again", NOTIFICATION_TYPE.ERROR)))

            return false;
        }
    }
}