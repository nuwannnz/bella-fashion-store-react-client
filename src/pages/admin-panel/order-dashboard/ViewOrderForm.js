
import React from 'react'
import OverlayPopup from '../../../components/common/OverlayPopup'

export default function ViewOrderForm({ order, closePopup }) {
    return (
        <OverlayPopup title={`Order info`} onClosing={closePopup} displayActions={false}>
            <div>
                <table className="table table-borderless">
                    <tr>
                        <th scope="row">
                            Order id:
                        </th>
                        <td >
                            {order._id}
                        </td>
                    </tr>
                    <tr>

                        <th scope="row">
                            Order date:
                        </th>
                        <td>
                            {order.createdAt}
                        </td>
                    </tr>

                    <tr>

                        <th scope="row">
                            Customer id:
                        </th>

                        <td>
                            {order.customer?._id}
                        </td>
                    </tr>

                    <tr>

                        <th scope="row">
                            Customer full name:
                        </th>
                        <td>
                            {`${order.customer?.fName} ${order.customer?.lName}`}
                        </td>
                    </tr>
                    <tr>

                        <th scope="row">
                            Order status:
                        </th>
                        <td>
                            {order.isCompleted ?
                                <span class="badge badge-success">Completed</span> :
                                <span class="badge badge-warning">Pending</span>

                            }
                        </td>
                    </tr>

                    <tr>

                        <th scope="row">
                            Order value:
                        </th>

                        <td>
                            LKR {order.totalValue}
                        </td>

                    </tr>

                    <tr>
                        <th scope="row">
                            Order items:
                        </th>

                        <td>
                            Order items:
                        </td>

                    </tr>
                    <tr>
                        <td colSpan="2">
                            <table className="table">


                                {
                                    order.items.map(item => (
                                        <tr>
                                            <td>
                                                <div>
                                                    <img style={{ width: '50px', height: '75px', marginRight: '5px' }} src={item.product?.images[0]} alt="product images" />
                                                    <span>{`${item.qty} X`}</span>
                                                    <span>{`${item.product?.name} (${item.size})`}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </td>
                    </tr>
                </table>

            </div>
        </OverlayPopup>
    )
}
