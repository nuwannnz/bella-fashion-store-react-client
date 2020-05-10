import React, { useState } from 'react'
import '../../styles/common/InputBox.css';

export default function TextBox({ onTextInput = null, onTextChange = null, placeholder = "", name = "", type = "", disabled = false }) {
    const [text, setText] = useState("");
    return (
            <input
                className="input-box"
                type={type}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(e) => {
                    if (onTextChange !== null) {
                        onTextChange(e.target.value);
                    }
                    setText(e.target.value);
                }}
                onInput={(e) => {
                    if (onTextInput !== null) {
                        onTextInput(e.target.value);
                    }
                    setText(e.target.value);
                }}
            />
        

    )
}
