
import React from 'react'
import '../../styles/common/ErrorMessage.css';

export default function ErrorMessage({ msg }) {
    return (
        <div className="error-msg-wrapper">
            <span>{msg}</span>
        </div>
    )
}
