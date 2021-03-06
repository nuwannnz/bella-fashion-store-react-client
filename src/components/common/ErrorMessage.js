
import React from 'react'
import '../../styles/common/Messages.css';

export default function ErrorMessage({ msg }) {
    return (
        <div className="msg-wrapper error">
            <span>{msg}</span>
        </div>
    )
}
