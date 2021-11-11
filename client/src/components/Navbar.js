import React from "react";
import { NavLink } from "react-router-dom";
import Auth from '../utils/auth';

import './Navbar.css';

function Navbar() {


    return(
        <nav className="Navbar">
            <label className="Navbar-logo">NOT TAC TOE</label>
            <ul className="Navbar-links">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/signup">Signup</NavLink></li>
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><a href="#" onClick={Auth.logout}>Logout</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;