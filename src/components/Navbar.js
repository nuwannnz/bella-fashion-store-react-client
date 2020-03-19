import React, { Component } from 'react'
import logo from '../images/logo.jpeg'
import {faAlignRight, FaAlignRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {

    state = {
            isOpen: false
    };
    handleToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    render() {
        return <div>hello from nav bar</div>
        
     }
}
