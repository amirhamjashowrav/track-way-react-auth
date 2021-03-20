import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';


const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <div className="container-fluid" >
                    <Link to="/home">
                        <img className="logo" src={logo} alt='logo' />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item li-item">
                                <Link style={{ textDecoration: 'none', color: 'white' }} to="/home">Home</Link>
                            </li>
                            <li className="nav-item li-item">
                                <Link style={{ textDecoration: 'none', color: 'white' }} to="/destination">Destination</Link>
                            </li>
                            <li className="nav-item li-item">
                                <Link style={{ textDecoration: 'none', color: 'white' }} to="/blog">Blog</Link>
                            </li>
                            <li className="nav-item li-item">
                                <Link style={{ textDecoration: 'none', color: 'white' }} to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <Link to="/login"><button className="btn btn-light login" type="submit">Log in</button></Link>
                        </form>
                    </div>
                </div>
        </nav>
    );
};

export default Header;