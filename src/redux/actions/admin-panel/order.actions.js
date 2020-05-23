
import { deleteOrder, updateOrderStatus, getAllOrders } from "../../../services/admin/order.service";

export const ORDER_ACTION_TYPES = {
    LOAD_ORDERS_REQUEST: 'LOAD_ORDERS_REQUEST',
    LOAD_ORDERS_SUCCESS: 'LOAD_ORDERS_SUCCESS',
    LOAD_ORDERS_FAILURE: 'LOAD_ORDERS_FAILURE',

    DELETE_ORDER_REQUEST: 'DELETE_ORDER_REQUEST',
    DELETE_ORDER_SUCCESS: 'DELETE_ORDER_SUCCESS',
    DELETE_ORDER_FAILURE: 'DELETE_ORDER_FAILURE',

    UPDATE_ORDER_REQUEST: 'UPDATE_ORDER_REQUEST',
    UPDATE_ORDER_SUCCESS: 'UPDATE_ORDER_SUCCESS',
    UPDATE_ORDER_FAILURE: 'UPDATE_ORDER_FAILURE',

}

export function loadOrdersAsync() {
    return async (dispatch, getState) => {
        dispatch(request())
        const { token } = getState().staffLogin.auth;
        const result = await getAllOrders(token);

        if (result.isResultOk()) {
            dispatch(success(result.data));
        } else {
            dispatch(failure(result.errorMessage));
        }
    }

    function request() {
        return { type: ORDER_ACTION_TYPES.LOAD_ORDERS_REQUEST }
    }
    function success(payload) {
        return { type: ORDER_ACTION_TYPES.LOAD_ORDERS_SUCCESS, payload }

    }
    function failure(payload) {
        return { type: ORDER_ACTION_TYPES.LOAD_ORDERS_FAILURE, payload }

    }

}

export function deleteOrderAsync(orderId) {
    return async (dispatch, getState) => {
        dispatch(request())
        const { token } = getState().staffLogin.auth;
        const result = await deleteOrder(token, orderId);

        if (result.isResultOk()) {
            dispatch(success(result.data));
        } else {
            dispatch(failure(result.errorMessage));
        }
    }

    function request() {
        return { type: ORDER_ACTION_TYPES.DELETE_ORDER_REQUEST }
    }
    function success(payload) {
        return { type: ORDER_ACTION_TYPES.DELETE_ORDER_SUCCESS, payload }

    }
    function failure(payload) {
        return { type: ORDER_ACTION_TYPES.DELETE_ORDER_REQUEST, payload }

    }

}

export function updateOrderStatusAsync(orderId, orderStatus) {
    return async (dispatch, getState) => {
        dispatch(request())
        const { token } = getState().staffLogin.auth;
        const result = await updateOrderStatus(token, orderId, orderStatus);

        if (result.isResultOk()) {
            dispatch(success(result.data));
        } else {
            dispatch(failure(result.errorMessage));
        }
    }

    function request() {
        return { type: ORDER_ACTION_TYPES.UPDATE_ORDER_REQUEST }
    }
    function success(payload) {
        return { type: ORDER_ACTION_TYPES.UPDATE_ORDER_SUCCESS, payload }

    }
    function failure(payload) {
        return { type: ORDER_ACTION_TYPES.UPDATE_ORDER_FAILURE, payload }

    }

}