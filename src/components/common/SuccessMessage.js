
import React from 'react'
import '../../styles/common/Messages.css';

export default function SuccessMessage({ msg }) {
    return (
        <div className="msg-wrapper success">
            <span>{msg}</span>
        </div>
    )
}
