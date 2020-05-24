import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadOrdersAsync, updateOrderStatusAsync, deleteOrderAsync } from "../../../redux/actions/admin-panel/order.actions";
import '../../../styles/admin/OrderDashboard.css'
import { openPopup } from "../../../redux/actions/popup.actions";
import { POPUP_KEYS } from "../../../constants";
export default function OrderDashboardPage() {

    const dispatch = useDispatch();
    const orders = useSelector(state => state.order);

    useEffect(() => {
        dispatch(loadOrdersAsync());
    }, [])

    return (
        <div className="dashboard-page">
            <div className="page-content">
                <h1 className="page-title">Order Management</h1>
                <div className="tab-page">
                    {orders.loadng && <span>Loading</span>}

                    <table className="orders-table table table-hover">

                        <tr>
                            <th scope="col">Order number</th>
                            <th scope="col">Order date</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Order status</th>
                            <th scope="col">Order value (LKR)</th>
                            <th scope="col">Actions</th>
                        </tr>

                        {orders.items && orders.items.map((order, i) => (
                            <OrderEntry key={i} order={order} />
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}


function OrderEntry({ order }) {

    const dispatch = useDispatch();
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false)

    const handleViewClick = () => {
        dispatch(openPopup(POPUP_KEYS.ORDER_INFO_POPUP, { order }));
    }

    const handleUpdateClick = () => {
        setUpdating(true);
        dispatch(updateOrderStatusAsync(order._id, !order.isCompleted)).then(() => setUpdating(false));
    }

    const handleDeleteClick = () => {
        setDeleting(true);
        dispatch(deleteOrderAsync(order._id)).then(() => setDeleting(false))
    }

    return (
        <tr className="order-entry">

            <td>
                <span>{order._id}</span>
            </td>

            <td>
                <span>{order.createdAt}</span>
            </td>

            <td>
                <span>{order.customer?.fName}</span>
            </td>

            <td>
                <span>{order.isCompleted ?
                    <span class="badge badge-success">Completed</span> :
                    <span class="badge badge-warning">Pending</span>

                }</span>
            </td>
            <td>
                <span>{order.totalValue}</span>
            </td>

            <td>


                <button className="btn btn-sm btn-light mr-1" onClick={handleUpdateClick} disabled={order.isCompleted}>
                    {!updating && (
                        <span>

                            <i className="fas fa-check mr-2"></i>
                            <span>
                                Mark as completed
                        </span>
                        </span>
                    )}

                    {updating && (
                        <span>
                            <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                            Updating...
                        </span>
                    )}

                </button>
                <button className="btn btn-sm btn-info mr-1" onClick={handleViewClick}>
                    <i className="fas fa-expand-alt"></i>
                </button>
                <button className="btn btn-sm btn-danger" onClick={handleDeleteClick}>
                    {!deleting &&
                        <i className="far fa-trash-alt"></i>
                    }
                    {deleting && (
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    )}
                </button>

            </td>

        </tr>
    )
}