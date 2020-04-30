import React from 'react'
import '../../../styles/admin/SideBar.css';
import { FaEnvelope, FaLock } from "react-icons/fa";

function SideBarMenuButton({ text, Icon, onClickHandler }) {
    return (
        <div className="side-bar-menu-btn">
            <div className="icon-wrapper flex-center">
                <Icon color="#fff" />
            </div>
            <div className="tex-wrapper flex-center">
                {text}
            </div>
        </div>
    )
}

export default function SideBar() {
    return (
        <div className="side-bar h-100 w-100">
            <div className="content h-100 w-100 flex flex-c">
                <div className="top-portion">

                </div>

                <div className="middle-portion">

                </div>

                <div className="bottom-portion">

                </div>
            </div>
        </div>
    )
}
