import React, { useState } from 'react'
import '../../../styles/admin/SideBar.css';
import { useDispatch } from 'react-redux';
import { logoutAsync } from "../../../redux/actions/admin-panel/staff.actions";
import { getAssetUrl } from "../../../helpers/assets.helper";
import { Link, NavLink } from 'react-router-dom';

function SideBarButton({ text, icon, onClickHandler }) {
    return (
        <div className="side-bar-btn flex flex-c" onClick={onClickHandler} >
            <div className="icon-wrapper flex-center">
                <span>
                    <i className={icon} ></i>
                </span>
            </div>
            <div className="text-wrapper flex">
                {text}
            </div>
            {/* 
            <div className="tooltip flex-center">
                <span>{text}</span>
            </div> */}
        </div>
    )
}

export default function SideBar({ menuItems }) {

    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState(false)

    return (
        <div className="side-bar-wrap">
            <div className="side-bar h-100 w-100">
                <div className="content h-100 w-100 flex flex-c">
                    <div className="side-bar-section">
                        <div className="side-bar-logo-wrap flex-center w-100">
                            <img className="w-75 h-75" src={getAssetUrl('logo/logo-inverted.png')} alt="Bella logo" />

                        </div>

                        <div className="side-bar-section middle-section">

                            {
                                menuItems.map(menuItem => (

                                    <NavLink to={menuItem.link} title={menuItem.title} activeClassName="active">
                                        <SideBarButton text={menuItem.label} icon={menuItem.icon} />
                                    </NavLink>

                                ))
                            }
                            {/* 
                            <Link to={ROUTE_PATHS.ADIMN_DASHBOARD_USER} title="User dashboard" >
                                <SideBarButton text="Users" Icon={FiUsers} />
                            </Link>

                            <Link>
                                <SideBarButton text="Categories" Icon={FaSitemap} />
                            </Link>
                            <Link>
                                <SideBarButton text="Products" Icon={FaTshirt} />
                            </Link>


                            <Link>
                                <SideBarButton text="Inquiries" Icon={AiFillQuestionCircle} />
                            </Link>
                            <Link to={ROUTE_PATHS.ADIMN_DASHBOARD_ORDER} title="Order dashboard">
                                <SideBarButton text="Orders" Icon={FaShoppingBag} />
                            </Link> */}
                        </div>

                    </div>

                    <div className="side-bar-section">
                        <SideBarButton text="Log out"
                            icon="fas fa-sign-out-alt"
                            onClickHandler={() => dispatch(logoutAsync())} />
                    </div>
                </div>
            </div>
        </div>
    )
}
