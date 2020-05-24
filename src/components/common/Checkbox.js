import React, { useState, Children, useEffect } from 'react'
import "../../styles/common/Checkbox.css";

export default function Checkbox({ text, onCheck, isChecked = false }) {
    const [selected, setSelected] = useState(isChecked);

    useEffect(() => {
        setSelected(isChecked);
    }, [isChecked])

    useEffect(() => {
        if (onCheck) { onCheck(selected) };
    }, [selected])

    return (
        <div className="checkbox" onClick={() => setSelected(!selected)}>
            <div className={`box ${selected && 'checked'}`} >
                {selected &&
                    <span>
                        <i className="fas fa-check"></i>
                    </span>
                }
            </div>
            <span>{text}</span>
        </div>
    )
}


export function ColorCheckbox({ color, onCheck, isChecked = false }) {
    const [selected, setSelected] = useState(isChecked);

    useEffect(() => {
        if (onCheck) { onCheck(selected) };
    }, [selected])

    return (
        <div className="checkbox color-checkbox" onClick={() => setSelected(!selected)}>
            <div className={`box ${selected && 'checked'}`} style={{ backgroundColor: color, borderColor: color }} >
                {selected &&
                    <span>
                        <i className="fas fa-check"></i>
                    </span>
                }
            </div>
        </div>
    )
}


