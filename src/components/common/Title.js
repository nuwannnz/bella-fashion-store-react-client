import React from 'react'

export default function Title({title,subtitle}) {
    

    return (
        <div className="section-title">
            <h1>{title}</h1>
            <div></div><br/>
            <h6>{subtitle}</h6>
        </div>
    )
}
