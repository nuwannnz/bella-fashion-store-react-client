import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadOrdersAsync } from "../../../redux/actions/admin-panel/order.actions";
import '../../../styles/admin/OrderDashboard.css'
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
                            <th scope="col">Customer id</th>
                            <th scope="col">Order status</th>
                            <th scope="col">Order value</th>
                            <th scope="col">Order value</th>
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


                <button className="btn btn-sm btn-light mr-1">
                    <i className="fas fa-check mr-2"></i>
                    <span>
                        Mark as completed
                        </span>
                </button>
                <button className="btn btn-sm btn-danger">
                    <i className="far fa-trash-alt"></i>
                </button>

            </td>

        </tr>
    )
}