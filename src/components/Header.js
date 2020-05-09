import React from "react";
import { useDispatch } from "react-redux";
import '../styles/Header.css';
import { logoutAsync } from "../redux/actions/customer/customer.actions";
import { useHistory} from "react-router-dom";

export const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className="header-wrap flex-center">
            <span className="title">Bella Fashion</span>
            <div className="log-out-wrap">
                <button onClick={(() => {
                    dispatch(logoutAsync(history));
                })}>Log out</button>
            </div>
        </div>
    )
}