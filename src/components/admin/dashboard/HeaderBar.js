import React from 'react'
import "../../../styles/admin/HeaderBar.css";
import { useSelector } from 'react-redux';
import TextBox from '../../common/TextBox';


function UserInfo({ userName }) {
    return (
        <div className="user-info-wrapper h-100 flex-center">
            <span>{userName}</span>
        </div>
    )
}

function SearchBar({ onSearchClick }) {
    return (
        <div className="search-wrapper w-100 h-100">
            <TextBox animateTitle={false} placeholder="Search" doSpacing={false} />
        </div>
    )
}

export default function HeaderBar() {

    const user = useSelector(state => state.staffLogin.auth.userInfo.user);

    return (
        <div className="header-bar w-100 h-100">
            <div className="header-bar-content w-100 h-100 flex">
                <SearchBar />
                <UserInfo userName={user ? user.fName : ''} />
            </div>
        </div>
    )
}
