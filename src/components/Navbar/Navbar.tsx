import * as React from 'react';
import './navbar.scss';
import Logo from '../../images/logo.png'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="left-navbar">
                <a href="/"><img src={Logo} alt="logo" className="logo" /></a>
                <h2 className="browse">Browse</h2>
            </div>
            <div className="right-navbar">
                <input />
                <h2 className="author">Icon</h2>
            </div>
        </div>
    )
}

export default Navbar;
