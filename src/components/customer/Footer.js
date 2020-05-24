import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_PATHS } from '../../constants'
import '../../styles/footer.css';

export default function Footer() {

    return (
        <div className="footer d-flex h-100 flex-column justify-content-center align-items-center">
            <div className="link-wrap d-flex justify-content-center align-items-center">

                <Link to={ROUTE_PATHS.CUSTOMER_ABOUTUS}>
                    <span>About us</span>
                </Link>
                <span className="separator"><i className="fas fa-circle"></i></span>
                <Link to={ROUTE_PATHS.CUSTOMER_CONTACT}>
                    <span>Contact us</span>
                </Link>
            </div>
            <p className="mt-2">
                Copyright &copy; 2020 Bella fasions. All rights reserved.
            </p>
        </div>
    )
}
