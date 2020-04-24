
import React, { useState } from 'react'
import '../../styles/common/TextBox.css';

export default function TextBox({ onTextInput = null, onTextChange = null, label, placeholder = "", name = "textBox", type = "text", animateTitle = true, disabled = false }) {
    const [text, setText] = useState("");
    return (

        <div className="form-element-wrapper ">
            <label className={animateTitle && text.length === 0 ? 'animate-label' : ''}>{label}</label>
            <input
                className="textual-form-element"
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
        </div>

    )
}
