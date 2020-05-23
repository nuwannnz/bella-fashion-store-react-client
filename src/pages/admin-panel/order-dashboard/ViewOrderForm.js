
import React from 'react'
import OverlayPopup from '../../../components/common/OverlayPopup'

export default function ViewOrderForm({ order, closePopup }) {
    return (
        <OverlayPopup title={`Order ${order._id}`} >
            <div>

            </div>
        </OverlayPopup>
    )
}
